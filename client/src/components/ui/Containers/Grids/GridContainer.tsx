import { Grid } from '@mui/material';
import React from 'react';

interface GridContainerProps {
  [propName: string]: string;
}

function GridContainer({ children, ...props } : GridContainerProps) {
  return (
    <Grid container spacing={2} {...props}>
      {children}
    </Grid>
  );
}

export default GridContainer;
