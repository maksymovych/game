/* eslint-disable react/prop-types */
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Text from '../../../ui/Text/Text';
import Board from './board/Board';
import newGameField from '../../../../config/emptyField';
import {
  markNewStepOnField,
  markNewStepsArray,
} from '../../../../config/markField';
import { markIfShipSink } from '../../../../config/markIfShipSink';

function YourField({
  field: ownField,
  opponentResponse: { y, x },
  opponentSteps,
}) {
  const { field, isFields } = useSelector((state) => state.game);
  const [ownSteps, setOwnSteps] = useState(ownField);
  useEffect(() => {
    !!opponentSteps?.length &&
      setOwnSteps([
        ...markIfShipSink(ownField, markNewStepsArray(ownSteps, opponentSteps)),
      ]);
    return () => setOwnSteps([...newGameField]);
  }, [opponentSteps]);

  useEffect(() => {
    if (x > -1 && y > -1) {
      setOwnSteps([
        ...markIfShipSink(ownField, markNewStepOnField(ownSteps, y, x)),
      ]);
    }
  }, [y, x]);

  const handleSteps = (x, y) => {};

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Text>Your field</Text>
      <Box>
        <Board
          isActive={false}
          gameSteps={isFields ? ownSteps : field}
          handleFillBox={handleSteps}
        />
      </Box>
    </Box>
  );
}

export default YourField;
