/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { MARK } from '../../../../config/boardParams';
import { socketAct } from '../../../../config/socketActions';
import socket from '../../../../socket/socket';
import Text from '../../../ui/Text/Text';
import Timer from '../../../ui/Timer/Timer';
import Board from './board/Board';
import gameField from '../../../../config/emptyField';
import { useDispatch } from 'react-redux';
import { leaveGame, setIsActive } from '../../../../store/reducers/game';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Box, Typography } from '@mui/material';
import { markIfShipSink, shipsAmount } from '../../../../config/markIfShipSink';
import { markPointToField } from '../../../../config/markField';

function OpponentsField({ field, userId, gameId, isActive, steps }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [state, setState] = useState({
    gameField,
    message: '',
    SHIPS: shipsAmount,
  });
  const [time, setTime] = useState({ minutes: '00', seconds: '00' });

  const messageToUser = Object.keys(shipsAmount).map(
    (key, index) =>
      !!shipsAmount[key] && (
        <Typography key={index}>
          {key}, {shipsAmount[key]} more
        </Typography>
      )
  );

  useEffect(() => {
    const padZero = (number) => number.toString().padStart(2, '0');
    socket.on(socketAct.TIMER, (time) => {
      const minutes = padZero(Math.floor(time / 60));
      const seconds = padZero(time % 60);
      setTime({ minutes, seconds });
    });

    socket.on(socketAct.SKIP, ({ status, message }) => {
      status && setState((state) => ({ ...state, message }));
      dispatch(setIsActive({ isActive: false }));
    });
  }, []);

  useEffect(() => {
    if (!!steps?.length) {
      let newField = state.gameField;

      steps.forEach(({ y, x }) => {
        if (field[y][x] === MARK.ship) {
          newField[y][x] = MARK.hit;
        } else {
          newField[y][x] = MARK.miss;
        }
      });

      setState({
        ...state,
        gameField: [...markIfShipSink(field, newField, true)],
      });
    }
  }, [steps]);

  const handleSteps = (x, y) => {
    let modifiedField = [];
    if (
      state.gameField[y][x] === MARK.miss ||
      state.gameField[y][x] === MARK.hit
    ) {
      return;
    }

    socket.emit(socketAct.STEP, gameId, userId, x, y, ({ response }) => {
      if (response.status) {
        modifiedField = markPointToField(y, x, field, state.gameField);
        if (state.gameField[y][x] === MARK.hit) {
          shipsAmount.one = 4;
          shipsAmount.two = 3;
          shipsAmount.three = 2;
          shipsAmount.four = 1;
          modifiedField = markIfShipSink(field, modifiedField, true);
        }

        setState({
          ...state,
          message: response.message,
          gameField: [...modifiedField],
        });
      }
      if (response.status === 2) {
        localStorage.setItem('isStart', '0');

        navigate('../gameWin');

        dispatch(leaveGame());
      }
      dispatch(setIsActive({ isActive: response.isHit }));
    });
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Text>Opponents field</Text>

      <Board
        gameSteps={state.gameField}
        handleFillBox={handleSteps}
        isActive={isActive}
      />
      {isActive ? (
        <Text>
          Your turn
          <TagFacesIcon sx={{ fontSize: 30, pl: '5px' }} />
        </Text>
      ) : (
        state.message && <Text>{state.message}</Text>
      )}
      <Timer
        align="center"
        min={time.minutes}
        sec={time.seconds}
        sx={!isActive ? { opacity: '0.4' } : {}}
      />
      <Typography sx={{ pl: 2 }}>Your goal strike ship(s):</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',

          pr: 2,
        }}
      >
        {messageToUser}
      </Box>
    </Box>
  );
}

export default OpponentsField;
