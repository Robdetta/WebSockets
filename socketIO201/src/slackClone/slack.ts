import express from 'express';
const app = express();
import { Server } from 'socket.io';

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);

const io = new Server(expressServer);

io.on('connection', (socket) => {
  console.log(socket.id, 'has connected');
  socket.emit('welcome', 'Welcome to the server');
});
