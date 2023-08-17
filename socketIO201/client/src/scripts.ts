import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('connected');
  socket.emit('clientConnect');
});

socket.on('welcome', (data) => {
  console.log(data);
});
