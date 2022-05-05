import * as React from 'react';
import { Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function Timer({ min, sec, ...props }) {
  return (
    <Typography variant="h4" component="div" {...props}>
      {min} : {sec}
    </Typography>
  );
}
