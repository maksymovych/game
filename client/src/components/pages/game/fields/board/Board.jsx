/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Stack } from '@mui/material';
import BoxUnit from '../../../../ui/BoxUnit/BoxUnit';
import { letters, MARK, steps } from '../../../../../config/boardParams';
import { grey } from '@mui/material/colors';

function Board({ gameSteps, handleFillBox, isActive }) {
  const disableStyles = {
    backgroundColor: grey[200],
    opacity: 0.5,
    position: 'relative',
    zIndex: -1,
  };
  const styleDisable = isActive ? {} : { ...disableStyles };
  return (
    <Box sx={styleDisable}>
      <Stack sx={{ justifyContent: 'center' }} spacing={0} direction="row">
        {letters.map((letter, i) => (
          <BoxUnit key={i}>{letter}</BoxUnit>
        ))}
      </Stack>

      {gameSteps.length &&
        gameSteps.map((row, index) => (
          <Stack
            sx={{ justifyContent: 'center' }}
            key={index}
            spacing={0}
            direction="row"
          >
            <BoxUnit>{index + 1}</BoxUnit>
            {row &&
              row.map((field, i) => (
                <BoxUnit
                  isDot={field === MARK.miss}
                  isHit={field === MARK.hit}
                  onClick={() => handleFillBox(i, index)}
                  key={i}
                  isActive={isActive}
                >
                  {(field === MARK.miss && steps.dot) ||
                    (field === MARK.hit && steps.bomb) ||
                    (field > MARK.hit && steps.ship)}
                </BoxUnit>
              ))}
          </Stack>
        ))}
    </Box>
  );
}

export default Board;
