import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { socketAct } from '../../../../config/socketActions';
import socket from '../../../../socket/socket';
import DefaultButton from '../../../ui/Buttons/DefaultButton/DefaultButton';
import { useDispatch, useSelector } from 'react-redux';
import Board from './board/Board';
import { gameField } from '../../../../store/reducers/game';
import Text from '../../../ui/Text/Text';
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage';
import { MARK } from '../../../../config/boardParams';

function PlaceShips() {
  const { field } = useSelector((state) => state.game);
  const { id: userId } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const newField = new Array(10)
    .fill(' ')
    .map(() => new Array(10).fill(MARK.empty));

  const [state, setState] = useState({ gameSteps: newField, step: 20 });
  const gameId = localStorage.getItem('gameId');
  const isGameStart = localStorage.getItem('isStart');
  const checkSteps = (isCheck) => {
    socket.emit(
      socketAct.CONFIRM_STEPS,
      state.gameSteps,
      userId,
      gameId,
      isCheck,
      (response) => {
        dispatch(gameField(response));
      }
    );
  };

  useEffect(() => {
    isGameStart === '0' && checkSteps(true);
  }, [state.step]);

  const handleFillBox = (y, x) => {
    const newStep = state.gameSteps;
    let increment = 1;
    const currentStep = state.gameSteps[x][y];

    if (!state.step && currentStep === MARK.empty) {
      return;
    }
    if (!!state.step && currentStep === MARK.empty) {
      newStep[x][y] = MARK.new;
      increment = -1;
    } else {
      newStep[x][y] = MARK.empty;
    }

    setState((prev) => {
      return { step: prev.step + increment, gameSteps: [...newStep] };
    });
  };

  const handleConfirmSteps = () => {
    checkSteps(false);
  };

  const placeShipRandomly = () => {
    socket.emit(socketAct.GET_RANDOM_SHIP_PLACEMENT, async (response) => {
      setState({
        step: 20 - response.steps,
        gameSteps: [...response.result],
      });
    });
  };

  const cleanField = () => {
    setState({ step: 20, gameSteps: [...newField] });
  };

  return (
    <Box>
      <Text>Put the ships in the correct order</Text>
      <Board
        gameSteps={state.gameSteps}
        handleFillBox={handleFillBox}
        isActive={true}
      />

      {state.step === 20 && (
        <DefaultButton onClick={placeShipRandomly}>
          Place Ships randomly
        </DefaultButton>
      )}
      {state.step < 20 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="error" sx={{ my: '20px' }} onClick={cleanField}>
            Clean the field
          </Button>
        </Box>
      )}

      {!state.step && (
        <DefaultButton onClick={handleConfirmSteps}>
          Confirm steps
        </DefaultButton>
      )}
      {field[0] === 'error' &&
        field.map((message, i) => {
          if (i !== 0) return <ErrorMessage key={i}>{message}</ErrorMessage>;
        })}
    </Box>
  );
}

export default PlaceShips;
