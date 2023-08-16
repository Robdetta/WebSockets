import express from 'express';
import path from 'path';
const app = express();
import { Server } from 'socket.io';

app.use(express.static(path.join(__dirname + '/public')));

const expressServer = app.listen(3001);

console.log(`listening on port 3001`);
const io = new Server(expressServer);

io.on('connection', (socket) => {
  console.log(socket.id, 'has connected');
  socket.emit('welcome', 'Welcome to the server');
});
