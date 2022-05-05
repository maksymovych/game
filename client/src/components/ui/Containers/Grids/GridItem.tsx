/* eslint-disable react/prop-types */
import { Grid } from '@mui/material';
import React from 'react';

interface GridItemProps {
  [propName: string]: string;
}

function GridItem({ children, ...props }: GridItemProps) {
  return <Grid item xs={8} {...props}></Grid>;
}

export default GridItem;
