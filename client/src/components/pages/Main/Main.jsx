import React, { useEffect, useState } from 'react';
import SimpleContainer from '../../ui/Containers/SimpleContainer';
import DefaultButton from '../../ui/Buttons/DefaultButton/DefaultButton';
import socket from '../../../socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../../store/reducers/login';
import { socketAct } from '../../../config/socketActions';
import Text from '../../ui/Text/Text';
import { useNavigate } from 'react-router';
import { Box, Button, Typography } from '@mui/material';
import GameTable from '../../ui/GameTable/GameTable';
import Notification from '../../ui/Notification/Notification';
import Loader from '../../ui/Loader/Loader';
import { leaveGame } from '../../../store/reducers/game';

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    login: { authForm },
    game: { isCanceled, isFetching },
  } = useSelector((state) => state);
  const { id } = useSelector((state) => state.login);
  const defaultState = { user: '', gameData: [], newGameId: 0, games: [] };
  const [state, setState] = useState({ ...defaultState });
  const gameId = localStorage.getItem('gameId');
  const nickname = authForm?.userData?.nickname;
  const rate = authForm?.userData?.rate;
  const name = nickname && nickname.toUpperCase()[0] + nickname.slice(1);

  const resetState = () => {
    setState({ ...defaultState });
  };
  useEffect(() => {
    dispatch(getUserData());

    if (localStorage.getItem('isStart') === '1') {
      !!id &&
        socket.emit(
          socketAct.GET_STARTED_GAME,
          gameId,
          ({ game: games, status }) => {
            if (status) {
              setState({ ...state, games });
            }
          }
        );
    } else {
      socket.emit(socketAct.GET_CREATED_GAMES, ({ games, status }) => {
        if (status) {
          setState({ ...state, games });
        }
      });
    }

    socket.on(socketAct.GAME_CREATED, ({ games, status }) => {
      status && setState({ ...state, games: games.games });
    });

    socket.on(socketAct.ADD_PARTICIPANT, ({ games, status, gameId }) => {
      console.log('ADD_PARTICIPANT g:', games, 's ', status, 'id ', gameId);
      if (status && gameId == localStorage.getItem('gameId')) {
        localStorage.setItem('isStart', 1);
        setState({ ...state, games });
      } else {
        resetState();
      }
    });

    socket.on(socketAct.CANCEL_GAME, (response) => {
      if (response.status === 1) {
        localStorage.setItem('isStart', '0');
        localStorage.setItem('gameId', '');
        resetState();
        dispatch(leaveGame());
      }
    });

    return () => {
      resetState();
    };
  }, []);

  const createGame = () => {
    socket.emit(
      socketAct.CREATE_ROOM,
      id,
      ({ status, games, gameId, message }) => {
        if (status) {
          localStorage.setItem('gameId', gameId);

          setState({
            ...state,
            games: games.games,
          });
        }
      }
    );
  };

  const joinGame = (gameId) => {
    localStorage.setItem('gameId', gameId);
    localStorage.setItem('isStart', 1);
    socket.emit(socketAct.JOIN_ROOM, id, gameId);
  };

  const startGame = () => {
    resetState();

    navigate('../game');
  };

  const cancelGame = (gameId = gameId) => {
    console.log('cancel');
    socket.emit(socketAct.LEAVE_GAME, gameId, (response) => {
      // response.status && dispatch(leaveGame());
    });
  };
  if (isFetching) {
    return <Loader />;
  } else
    return (
      <SimpleContainer>
        <Text sx={{ mt: '30px' }}>
          {!!state.user
            ? `${state.user.nickname.toUpperCase()}, is waiting for participant`
            : `Welcome ${name}, you can start the game! Your score: ${rate}`}
        </Text>

        {state.games?.length ? (
          <Box sx={{ display: 'flex', p: 1 }}>
            <GameTable
              gameData={state.games}
              myName={nickname}
              joinGame={joinGame}
              startGame={startGame}
            />
          </Box>
        ) : (
          <DefaultButton onClick={createGame}>Create Game</DefaultButton>
        )}

        {isCanceled && <Notification>{isCanceled}</Notification>}
      </SimpleContainer>
    );
}

export default Main;
