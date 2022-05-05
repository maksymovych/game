import io from 'socket.io-client';


const socket = io(process.env.REACT_APP_API_HOST, {
  // withCredentials: true,
  transports: ['websocket'],
  reconnect: true,
});


export default socket;
