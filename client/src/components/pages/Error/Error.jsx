import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import DefaultButton from '../../ui/Buttons/DefaultButton/DefaultButton';
import SimpleContainer from '../../ui/Containers/SimpleContainer';

function Error() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('./');
  };
  return (
    <SimpleContainer>
      <Typography align="center" sx={{ pt: '20px' }}>
        404 Page not find Sorry!!!
      </Typography>
      <DefaultButton onClick={goToLogin}>Go to login page</DefaultButton>
    </SimpleContainer>
  );
}

export default Error;
