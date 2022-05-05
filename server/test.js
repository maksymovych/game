// const Io = require('socket.io');
// const clients = {};
// const socketServer = (server, app) => {
//   const io = Io(server);

//   // add Socket.io middleware to parse Koa-session cookie
//  // io.use(session(app));

//   io.on('connection', async (socket) => {
//     clients[socket.session.user_id] = socket;
//     console.log('Hi,Server 0_o', socket.session);
//     socket.emit('hello', 'Hi,Client :)');

//     socket.on('disconnect', () => {
//       console.log('disconnect');
//     });
//     socket.on('inviteUser', async (userId, groupId, groupName) => {
//       if (clients[userId]) {
//         clients[userId].emit('inviteUser', groupId, groupName);
//       }
//     });
//};
