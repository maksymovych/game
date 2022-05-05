const Io = require('socket.io');
const action = require('./config/socketConst');
const ServiceGame = require('./services/serviceGame');
const gameService = new ServiceGame();
const availableSteps = require('./config/game/availableSteps');
const randomShipPlacement = require('./config/game/getRandomShipPlacement');
const { timerInterval } = require('./config/config');
const cookie = require('cookie');
let intervalId;

module.exports = async (server) => {
  const io = Io(server);

  let countDown = timerInterval;

  io.on(action.CONNECTION, async (socket) => {
    socket.join('lobby');

    // const cookies = socket.handshake.headers.cookie;
    // const parsedCookie = cookie.parse(toString(cookies));
    //console.log('qqqqq', parsedCookie, cookies);

    socket.on(action.GET_RATE, async (userId, callback) => {
      const response = await gameService.getRate(userId, callback);

      callback(response);
    });

    socket.on(action.GET_USERS_RATE, async (callback) => {
      const usersData = await gameService.getUsersRate();

      callback(usersData);
    });

    socket.on(action.GET_FIELDS_AND_STEPS, async (userId, gameId, callback) => {
      const response = await gameService.getFieldsAndSteps(userId, gameId);
      callback(response);
    });

    socket.on(action.GET_GAME_DATA, async (gameId, callback) => {
      socket.leave('lobby');
      socket.join(gameId);
      const gameData = await gameService.getGameData(gameId);
      callback(gameData);
    });

    socket.on(action.GET_CREATED_GAMES, async (callback) => {
      const createdGames = await gameService.getCreatedGames();
      callback(createdGames);
    });

    socket.on(action.GET_STARTED_GAME, async (gameId, callback) => {
      const startedGame = await gameService.getStartedGame(gameId);
      callback(startedGame);
    });

    socket.on(action.CREATE_ROOM, async (userId, callback) => {
      const response = await gameService.createGame(userId);
      callback(response);
      if (response?.status) {
        socket.leave('lobby');
        socket.join(response.gameId);
        io.to('lobby').emit(action.GAME_CREATED, response);
      }
    });

    socket.on(action.JOIN_ROOM, async (userId, gameId) => {
      const response = await gameService.joinGame(userId, gameId);
      if (response.status) {
        socket.leave('lobby');
        socket.join(gameId);
        const games = await gameService.getStartedGame(gameId);

        io.to(gameId).to('lobby').emit(action.ADD_PARTICIPANT, {
          status: games.status,
          games: games.game,
          gameId,
        });
      }
    });

    socket.on(
      action.CONFIRM_STEPS,
      async (steps, userId, gameId, isCheck, callback) => {
        // addSocketIdToUsers(gameId, socket.id);
        socket.leave('lobby');
        socket.join(gameId);

        const validField = availableSteps(steps);
        const status = validField[0] === 'error' || isCheck ? false : true;
        let response = {};

        if (status) {
          response = await gameService.addField(validField, userId, gameId);
        }
        callback({ status, validField, message: response.message });

        if (response.isTwoField) {
          // addSocketIdToUsers(gameId, socket.id);
          io.in(gameId).emit(action.FIELDS_READY, { status: 1 });
        }
      }
    );

    socket.on(action.STEP, async (gameId, userId, x, y, callback) => {
      socket.leave('lobby');
      socket.join(gameId);
      console.log(socket.rooms);
      clearInterval(intervalId);
      intervalId = null;
      countDown = timerInterval;

      const response = await gameService.addStep(gameId, userId, x, y);

      callback({ response });

      if (response.status === 2) {
        socket.broadcast.to(gameId).emit(action.GAME_OVER, { status: 1 });

        return;
      } else if (response.status === 1) {
        socket.broadcast
          .to(gameId)
          .emit(action.OPPONENTS_STEP, x, y, response.isHit);
      }

      intervalId = setInterval(async () => {
        io.to(gameId).emit(action.TIMER, countDown);
        countDown--;

        if (countDown < 0) {
          clearInterval(intervalId);
          const responseToSkippedUser = {
            status: 1,
            message: 'You skipped the step',
          };

          if (response.isHit) {
            await gameService.skipStep(gameId, userId);
            ///
            socket.emit(action.SKIP, { ...responseToSkippedUser });
            io.in(gameId).emit(action.OPPONENTS_STEP, -1, -1, false);
          } else {
            await gameService.skipStep(gameId, userId, true);

            io.in(gameId).emit(action.SKIP, {
              ...responseToSkippedUser,
            });
            socket.emit(action.OPPONENTS_STEP, -1, -1, false);
          }
        }
      }, 1000);
    });

    socket.on(action.GET_RANDOM_SHIP_PLACEMENT, (callback) => {
      const response = randomShipPlacement();
      callback(response);
    });

    socket.on(action.LEAVE_GAME, async (gameId, callback) => {
      clearInterval(intervalId);
      const response = { status: 1 };
      const cancelGame = await gameService.cancelGame(gameId);

      if (cancelGame) {
        callback(response);

        io.to(gameId).emit(action.CANCEL_GAME, response);
      } else {
        callback((response.status = 0));
      }
      //delete users[userId];
    });

    socket.on(action.DISCONNECT, () => {
      console.log('Socket disconnected');
    });
  });
};