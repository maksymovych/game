import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import SimpleContainer from '../../ui/Containers/SimpleContainer';
import RecoveryForm from './FormRecovery/FormRecovery';
import { useNavigate } from 'react-router';
import HeaderText from '../../ui/Text/HeaderText';

function Recovery() {
  const navigate = useNavigate();
  const handleGoToRecover = () => {
    navigate('../');
  };

  return (
    <SimpleContainer>
      <HeaderText>Recovery:</HeaderText>
      <RecoveryForm />
      <Stack direction="row" justifyContent="center">
        <Button color="error" onClick={handleGoToRecover}>
          Go to Login
        </Button>
      </Stack>
    </SimpleContainer>
  );
}

export default Recovery;
