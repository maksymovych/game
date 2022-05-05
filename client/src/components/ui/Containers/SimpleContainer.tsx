import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
}

export default function SimpleContainer({ children }: ContainerProps) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  );
}
