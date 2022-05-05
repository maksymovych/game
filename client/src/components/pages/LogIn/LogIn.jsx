import React from 'react';
import { Button, Typography } from '@mui/material';
import LoginForm from './LoginForm/LoginForm';
import SimpleContainer from '../../ui/Containers/SimpleContainer';
import { useNavigate } from 'react-router';
import HeaderText from '../../ui/Text/HeaderText';
import { Box } from '@mui/system';

function LogIn() {
  const navigate = useNavigate();
  const handleGoToRecover = () => {
    navigate('../recovery');
  };
  const goToRegister = () => {
    navigate('../register');
  };
  return (
    <SimpleContainer>
      <HeaderText>LogIn:</HeaderText>
      <LoginForm />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ mt: '6px' }}>Do not have an account?</Typography>
        <Button onClick={goToRegister}>Sign up</Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ mt: '6px' }}>Forgot password?</Typography>
        <Button onClick={handleGoToRecover} color="error" >
          Recovery
        </Button>
      </Box>
    </SimpleContainer>
  );
};

export default LogIn;
