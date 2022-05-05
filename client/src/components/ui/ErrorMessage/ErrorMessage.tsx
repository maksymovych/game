import { Typography } from '@mui/material';
import React from 'react';

interface ErrorMessageProps {
  children: string;
}

function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <Typography component='h6' color='error'>
      {children}
    </Typography>
  );
}

export default ErrorMessage;
