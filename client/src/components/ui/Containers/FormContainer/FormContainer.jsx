import { Box } from '@mui/material';
import React from 'react';

// eslint-disable-next-line react/prop-types
function FormContainer({ children, ...props }) {
  return (
    <Box
      sx={{
        display: 'flex',
        px: '20px',
        flexDirection: 'column',
        justifyContent: 'spaceBetween',
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default FormContainer;
