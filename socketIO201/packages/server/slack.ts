import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { namespaces } from '../client/src/data/namespaces';

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

server.listen(3000, () => {
  console.log(`listening on port ${3000}`);
});

io.on('connection', (socket) => {
  socket.emit('welcome', 'Welcome to the server!');
  socket.on('clientConnect', (data) => {
    console.log(socket.id, 'has connected');
  });

  socket.emit('nsList', namespaces);
});
