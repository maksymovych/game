import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { string } from 'joi';

interface InputProps {
  props?: object;
  [propName: string]: string | any;
}

export default function DefaultInput({ ...props }: InputProps) {
  return (
    <Box sx={{ width: '100%', py: '10px' }}>
      <TextField fullWidth label={props.name} {...props} />
    </Box>
  );
}
