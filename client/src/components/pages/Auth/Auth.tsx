import React from 'react';
import SimpleContainer from '../../ui/Containers/SimpleContainer';
import AuthForm from './AuthForm/AuthForm';
import HeaderText from '../../ui/Text/HeaderText';
import { Button,  Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';

function Auth() {
  const navigate = useNavigate();

  const goToLogin =()=>{
    
    navigate('../');
  };
  
  return (
    <SimpleContainer>
      <HeaderText>
        Register:
      </HeaderText>

      <AuthForm />
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography sx={{mt: '6px'}}>Already have an account?</Typography>
        <Button onClick={goToLogin}>Sign in</Button>
      </Box>
    </SimpleContainer>
  );
}

export default Auth;
