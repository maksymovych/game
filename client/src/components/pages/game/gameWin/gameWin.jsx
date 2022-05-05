import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { socketAct } from '../../../../config/socketActions';
import socket from '../../../../socket/socket';
import GoToMain from '../../../ui/Buttons/goToMain/GoToMain';
import SimpleContainer from '../../../ui/Containers/SimpleContainer';
import GameTable from '../../../ui/GameTable/GameTable';
import Text from '../../../ui/Text/Text';

function GameWin() {
  const { id: userId } = useSelector((state) => state.login);
  const [gameData, setGameData] = useState([]);
  const [state, setState] = useState({ isConfetti: true, rate: 0 });
  const gameId = localStorage.getItem('gameId');
  const getScore = () => {
    console.log('Game');
    socket.emit(socketAct.GET_RATE, userId, (response) => {
      console.log('Game resp', response);
      if (response.status) {
        setState({ ...state, rate: response.rate });
      }
    });
  };
  useEffect(() => {
    socket.emit(socketAct.GET_GAME_DATA, gameId, ({ status, gameData }) => {
      status && setGameData(gameData);
    });
  }, []);

  setTimeout(() => setState({ ...state, isConfetti: false }), 8000);

  return (
    <SimpleContainer>
      {state.isConfetti && <Confetti />}
      <Text>Congratulate, you win!!!</Text>
      {gameData.length && <GameTable gameData={gameData} />}
      {!state?.rate ? (
        <Button onClick={getScore} sx={{ mt: 2 }}>
          Get your score
        </Button>
      ) : (
        <Text sx={{ mt: 2 }}>Your new score: {state.rate}</Text>
      )}
      <GoToMain />
    </SimpleContainer>
  );
}

export default GameWin;
