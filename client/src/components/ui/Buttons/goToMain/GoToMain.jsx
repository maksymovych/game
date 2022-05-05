import React from 'react';
import { useNavigate } from 'react-router';
import DefaultButton from '../DefaultButton/DefaultButton';

function GoToMain() {
  const navigate = useNavigate();
  const goToMain = () => {
    localStorage.setItem('gameId', '');
    navigate('../main');
  };

  return <DefaultButton onClick={goToMain}>Go to Main page</DefaultButton>;
}

export default GoToMain;
