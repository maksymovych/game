import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { socketAct } from '../../../config/socketActions';
import socket from '../../../socket/socket';
import GoToMain from '../../ui/Buttons/goToMain/GoToMain';
import SimpleContainer from '../../ui/Containers/SimpleContainer';
import Text from '../../ui/Text/Text';
import TableUsersScore from './TableUsersScore/TableUsersScore';

function UsersScore() {
  const [userData, setUserData] = useState([]);

    const { id } = useSelector((state) => state.login);

  useEffect(() => {
    socket.emit(socketAct.GET_USERS_RATE, ({ status, games }) => {
      status && setUserData(games);
    });
  }, []);

  return (
    <SimpleContainer>
      <Text>Users Score: </Text>
      <TableUsersScore userData={userData} userId={id} />

      <GoToMain />
    </SimpleContainer>
  );
}

export default UsersScore;
