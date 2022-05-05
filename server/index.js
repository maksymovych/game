const http = require('http');
const app = require('./koa');
const { setupDB } = require('./db/db-setup');
const socket = require('./socket');
const { PORT, API_URL } = require('./config/config');

setupDB();

const server = http.createServer(app.callback());

//socket
socket(server);

server.listen(PORT, () => {
  console.log('Server is running', PORT);
});
