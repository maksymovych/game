import * as React from 'react';
import Button from '@mui/material/Button';

interface DefaultButtonProps {
  [propName: string]: string;
}

export default function DefaultButton({
  children,
  ...props
}: DefaultButtonProps) {
  return (
    <Button sx={{ my: '20px' }} variant='contained' {...props} fullWidth>
      {children}
    </Button>
  );
}
