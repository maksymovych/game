/* eslint-disable react/prop-types */
import React from 'react';
import { Box } from '@mui/system';
import { purple } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

function BoxUnit({ children, isActive, isDot, isHit, ...props }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        minWidth: 30,
        minHeight: 30,
        fontSize: 25,
        lineHeight: 1,
        border: '1px solid',
        borderColor: purple[100],

        '&:hover': {
          borderColor: isDot || isHit ? purple[100] : purple[400],
        },
        backgroundColor: isDot ? grey[200] : 'white',
        opacity: isDot ? 0.5 : 1,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default BoxUnit;
