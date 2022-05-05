const { Game } = require('../models');
const { Steps } = require('../models');
const { Fields } = require('../models');
const { AuthUser } = require('../models');
const ServiceUser = require('../services/serviceUser');
const serviceUser = new ServiceUser();
const { STATUS_GAME, STEP_STATUS } = require('../config/game/constants');

module.exports = class ServiceGame {
  async createGame(user) {
    try {
      const checkUser = await serviceUser.getUser(user);

      if (!checkUser.nickname) {
        return { status: 0, message: 'Something went wrong with user ID' };
      }
      const ifHasCreatedGame = await Game.query()
        .where({ status: STATUS_GAME.created })
        .findOne({ user1: user });
      if (!!ifHasCreatedGame) {
        return { status: 0, message: 'You have created game' };
      } else {
        const response = await Game.query().insert({
          user1: user,
          status: STATUS_GAME.created,
        });

        const gameData = await this.getCreatedGames(response.id);
        return { status: 1, gameId: response.id, games: gameData };
      }
    } catch (err) {
      console.log('Error: Cant create game', err);
    }
  }

  async getUsersRate() {
    const games = await AuthUser.query()
      .select('nickname', 'rate', 'id')
      .orderBy('rate', 'desc');
    return { status: 1, games };
  }

  async getCreatedGames() {
    const games = await Game.query()
      .leftJoin('user_db AS user', 'game.user1', 'user.id')
      .select('user.nickname AS player1', 'game.id AS gameId')
      .where('status', STATUS_GAME.created);
    return { status: 1, games };
  }

  async getStartedGame(gameId) {
    try {
      const game = await Game.query()
        .where({ id: gameId })
        .select('user1', 'user2');

      const users = await AuthUser.query()
        .where({ id: game[0].user1 })
        .orWhere({ id: game[0].user2 })
        .select('nickname', 'id');

      return {
        status: 1,
        game: [
          {
            gameId: gameId,
            player1: users[0].nickname,
            player2: !!users[1]?.nickname && users[1].nickname,
          },
        ],
      };
    } catch (error) {
      console.log(error);
      return { status: 0, message: 'Invalid game id, try again' };
    }
  }

  async getRate(id) {
    const rate = await AuthUser.query().where({ id }).select('rate');
    return { status: 1, rate: rate[0].rate };
  }

  async getGameData(id) {
    try {
      const gameData = await Game.query()
        .where({ id })
        .select('user1', 'user2', 'stepsAmount', 'status', 'winner');

      const users = await AuthUser.query()
        .where({ id: gameData[0].user1 })
        .orWhere({ id: gameData[0].user2 })
        .select('nickname', 'id');

      const winner =
        gameData[0].winner === users[0].id
          ? users[0].nickname
          : users[1].nickname;

      return {
        status: 'ok',
        gameData: [
          {
            gameId: id,
            player1: users[0].nickname,
            player2: users[1].nickname,
            steps: gameData[0].stepsAmount,
            winner,
          },
        ],
      };
    } catch (error) {
      console.log(error);
      return { status: 0, message: 'Invalid game id, try again' };
    }
  }

  async getSteps(game_id, user_id) {
    const yourSteps = await Steps.query()
      .where({ game_id })
      .andWhere({ user_id })
      .andWhere('status', '!=', STEP_STATUS.skip)
      .select('y', 'x');
    const opponentSteps = await Steps.query()
      .where({ game_id })
      .andWhere('user_id', '!=', user_id)
      .andWhere('status', '!=', STEP_STATUS.skip)
      .select('y', 'x');

    const maxIdSteps = await Steps.query().where({ game_id }).max('id');

    const id = maxIdSteps[0].max;
    let isActive = true;

    if (!id) {
      const users = await Game.query()
        .where({ id: game_id })
        .select('user1', 'user2');

      return {
        status: 1,
        steps: { yourSteps, opponentSteps },
        isActive: users[0].user1 === user_id,
      };
    }

    const lastStepsData = await Steps.query()
      .where({ id })
      .select('user_id', 'status');

    const lastUser = lastStepsData[0].userId;
    const lastStatus = lastStepsData[0].status;

    if (
      lastUser === user_id &&
      (lastStatus === STEP_STATUS.skip || lastStatus === STEP_STATUS.miss)
    ) {
      isActive = false;
    }

    return { status: 1, steps: { yourSteps, opponentSteps }, isActive };
  }

  async getFields(game_id) {
    let message = 'The page updated';
    const gameData = await Game.query()
      .where({ id: game_id })
      .select('status', 'user1');
    if (gameData[0].status === STATUS_GAME.started) {
      const fields = await Fields.query()
        .where({ game_id })
        .select('field_1', 'field_2');

      return {
        status: 1,
        message,
        fields,
        firstStep: gameData[0].user1,
      };
    }
    if (gameData[0].status === STATUS_GAME.finished) {
      message = 'Game is finished, lets start another one';
    } else {
      message = 'Pleas wait while your opponent fields the ships.';
    }
    return {
      status: 0,
      message,
    };
  }

  async getFieldsAndSteps(user_id, game_id) {
    try {
      const fields = await this.getFields(game_id);
      const steps = await this.getSteps(game_id, user_id);
      return { status: 1, data: { ...fields, ...steps } };
    } catch (err) {
      console.log(err);
    }
  }

  async addStep(game_id, user_id, x, y) {
    const users = await Game.query()
      .where({ id: game_id })
      .select('user1', 'user2');

    const firstUser = users[0].user1;
    const secondUser = users[0].user2;

    if (!(user_id === firstUser || user_id === secondUser)) {
      return { status: 0, message: 'Inappropriate user' };
    }
    const maxStep = await Steps.query().where({ game_id }).max('id');

    let isHit = false;

    let status = 0;

    const field = await Fields.query()
      .where({ game_id })
      .select('field_1', 'field_2');

    if (
      (!!field[0].field1[user_id] &&
        Object.values(field[0].field2)[0][y][x] === 3) ||
      (!!field[0].field2[user_id] &&
        Object.values(field[0].field1)[0][y][x] === 3)
    ) {
      isHit = true;
    }

    //first step
    if (!maxStep[0].max) {
      if (firstUser === user_id) {
        await Steps.query().insert({
          game_id,
          user_id,
          x,
          y,
          status: isHit ? STEP_STATUS.hit : STEP_STATUS.miss,
        });

        status = 1;
      }
    } else {
      const lastStep = await Steps.query()
        .where({ game_id })
        .select('user_id', 'status')
        .orderBy('id', 'desc')
        .limit(1);

      const lastUser = lastStep[0].userId;
      const lastStatus = lastStep[0].status;

      if (
        (lastStatus === STEP_STATUS.hit && lastUser === user_id) ||
        ((lastStatus === STEP_STATUS.miss || lastStatus === STEP_STATUS.skip) &&
          lastUser !== user_id)
      ) {
        status = 1;
        await Steps.query().insert({
          game_id,
          user_id,
          x,
          y,
          status: isHit ? STEP_STATUS.hit : STEP_STATUS.miss,
        });

        await Steps.query()
          .count()
          .where({ game_id, user_id, status: 'hit' })
          .then(async (steps) => {
            if (steps[0].count === 20) {
              const steps_amount = await Steps.query()
                .count()
                .where({ game_id });

              await AuthUser.query()
                .where({ id: user_id })
                .increment('rate', 10);

              await Game.query()
                .where({ id: game_id })
                .update({ winner: user_id, status: 'finished', steps_amount });
              return { status: 2, isHit, message: 'You are a Winner!!!' };
            }
          });
      }
    }
    return {
      status,
      message: isHit ? 'You make step!' : 'Your opponent is making step',
      isHit,
    };
  }

  async skipStep(game_id, userId, isOtherUser) {
    let otherUser;
    if (isOtherUser) {
      const users = await Game.query()
        .where({ id: game_id })
        .select('user1', 'user2');

      otherUser = users[0].user1 === userId ? users[0].user2 : users[0].user1;
    }

    await Steps.query().insert({
      game_id,
      user_id: isOtherUser ? otherUser : userId,
      status: STEP_STATUS.skip,
    });
    return { status: 1 };
  }

  async joinGame(userId, id) {
    try {
      const user1 = await Game.query().where({ id }).select('user1');
  
      if (user1[0].user1 === userId) {
        return { status: 0 };
      } else {
        await Game.query()
          .where({ id })
          .update({ user2: userId, status: STATUS_GAME.started });
        return { status: 1 };
      }
    } catch(error){
      return {status: 0, message: error};
    }
  }

  async addField(field, userId, game_id) {
    try {
      const result = await Fields.query().findOne({ game_id });
      let message = 'Reload the page';
      let isTwoField = false;
      if (result) {
        await Fields.query()
          .where({ game_id })
          .update({
            field_2: { [userId]: field },
          });
        isTwoField = true;
      } else {
        await Fields.query().insert({
          game_id,
          field_1: { [userId]: field },
        });
        // await Game.query()
        //   .where({ id: game_id })
        //   .update({ status: STATUS_GAME.started });
      }
      return { message, isTwoField };
    } catch (err) {
      console.log(err);
      return { status: 0, message: err };
    }
  }

  async cancelGame(game_id, user_id) {
    const maxStep = await Steps.query().where({ game_id }).max('id');
    const minStep = await Steps.query().where({ game_id }).min('id');

    const steps_amount = maxStep[0].max - minStep[0].min;

    return await Game.query()
      .where({ id: game_id })
      .update({ status: STATUS_GAME.cancel, steps_amount, user_id });
  }
};
