import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

socket.on('connect', () => {
  console.log('Connected!!');
  socket.emit('clientConnected');
});

socket.on('welcome', (data) => {
  console.log(data);
});
