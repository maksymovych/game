import { Typography } from '@mui/material';
import React from 'react';

// eslint-disable-next-line react/prop-types
function Text({ children, ...props }) {
  return (
    <Typography
      align="center"
      variant="h5"
      component="h2"
      sx={{ p: '10px' }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default Text;
