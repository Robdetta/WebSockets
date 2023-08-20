import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { namespaces } from '../client/src/data/namespaces';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

const server = createServer(app);

//always join the main namespace, becauses that is where the client gets the name spaces from
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
  socket.on('clientConnect', () => {
    console.log(socket.id, 'has connected');
    socket.emit('nsList', namespaces);
  });
});

namespaces.forEach((namespace) => {
  const ns = io.of(namespace.endpoint);
  console.log(ns);

  // Debugging for user connections within the namespace
  io.on('connection', (socket) => {
    console.log(`${socket.id} has connected to ${ns.name}`);
  });
});
