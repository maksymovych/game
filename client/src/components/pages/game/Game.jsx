import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpponentsField from './fields/OpponentsField';
import YourField from './fields/YourField';
import PlaceShips from './fields/PlaceShips';
import socket from '../../../socket/socket';
import { socketAct } from '../../../config/socketActions';
import { useNavigate } from 'react-router';
import {
  fetchGameFields,
  leaveGame,
  setGameData,
  setIsActive,
} from '../../../store/reducers/game';
import Text from '../../ui/Text/Text';
import { getTwoFields } from '../../../config/getFields';
import { Button } from '@mui/material';

function Game() {
  const { field, isStart, gameFields, message, steps, isActive, isFields } =
    useSelector((state) => state.game);
    const { id } = useSelector((state) => state.login);

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const gameId = localStorage.getItem('gameId');

  const FIELD = useMemo(
    () =>
      gameFields.field2 && gameFields.field1 && getTwoFields(id, gameFields),
    [gameFields]
  );
  const [opponentsStep, setOpponentsStep] = useState({});
  const dispatchFields = () => {
    if (!!id) {
      dispatch(fetchGameFields({ id, gameId }));
    }
  };

  const cancelTheGame = () => {
    localStorage.setItem('isStart', '0');
    dispatch(leaveGame());
  };

  const handleLeaveGame = () => {
    socket.emit(socketAct.LEAVE_GAME, gameId, (response) => {
      localStorage.setItem('gameId', 0);
      navigate('../main');
    });
  };

  useEffect(() => {
    //dispatchFields();
    localStorage.getItem('isStart') === '2' &&
      socket.emit(
        socketAct.GET_FIELDS_AND_STEPS,
        id,
        gameId,
        ({ data, status }) => {
          console.log('gettttetetette', status, data);
          status && dispatch(setGameData(data));
        }
      );
  }, [isStart]);

  useEffect(() => {
    socket.on(socketAct.CANCEL_GAME, ({ status }) => {
      if (status === 1) {
        cancelTheGame();
        navigate('../main');
      }
    });

    socket.once(socketAct.FIELDS_READY, ({ status }) => {
      status && dispatchFields();
      localStorage.setItem('isStart', '2');
    });

    socket.on(socketAct.OPPONENTS_STEP, (x, y, isHit) => {
      x > -1 && y > -1 && setOpponentsStep({ y, x });
      dispatch(setIsActive({ isActive: !isHit }));
    });

    socket.on(socketAct.GAME_OVER, (response) => {
      if (response.status) {
        cancelTheGame();
        navigate('../gameOver');
      }
    });
    return () => {
      setOpponentsStep({});
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          p: '10px',
          minWidth: '340px',
          justifyContent: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          display: 'flex',
        }}
      >
        {isFields && !!FIELD?.opponent ? (
          <OpponentsField
            field={FIELD.opponent}
            userId={id}
            gameId={gameId}
            isActive={isActive}
            steps={steps.yourSteps}
          />
        ) : (
          <>{message && <Text>{message}</Text>}</>
        )}
        {isStart ? (
          <YourField
            opponentSteps={steps.opponentSteps}
            opponentResponse={opponentsStep}
            field={field.length || FIELD?.own}
          />
        ) : (
          <PlaceShips />
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button sx={{ my: '30px' }} color="secondary" onClick={handleLeaveGame}>
          Cancel the game
        </Button>
      </Box>
    </>
  );
}

export default Game;
