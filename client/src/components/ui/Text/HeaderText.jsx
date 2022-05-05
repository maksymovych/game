import { Typography } from '@mui/material';
import React from 'react';

// eslint-disable-next-line react/prop-types
function HeaderText({ children, ...props }) {
  return (
    <Typography
      align="center"
      sx={{ pt: '20px', pb: '10px' }}
      variant="h4"
      component="h2"
      {...props}
    >
      {children}
    </Typography>
  );
}

export default HeaderText;
