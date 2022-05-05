import React, { useEffect, useState } from 'react';
import { socketAct } from '../../../../config/socketActions';
import socket from '../../../../socket/socket';
import GoToMain from '../../../ui/Buttons/goToMain/GoToMain';
import SimpleContainer from '../../../ui/Containers/SimpleContainer';
import GameTable from '../../../ui/GameTable/GameTable';
import Text from '../../../ui/Text/Text';

function GameOver() {
  const gameId = localStorage.getItem('gameId');
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    socket.emit(socketAct.GET_GAME_DATA, gameId, ({ status, gameData }) => {
      if (status) {
        setGameData(gameData);
      }
    });
  }, []);

  return (
    <SimpleContainer>
      <Text>Game Over!!!</Text>
      {gameData.length && <GameTable gameData={gameData} />}
      <GoToMain />
    </SimpleContainer>
  );
}

export default GameOver;
