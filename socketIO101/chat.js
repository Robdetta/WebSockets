/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

const express = require('express');
const app = express();
const socketio = require('socket.io');
//how the docs do it
//import { Server } from 'socket.io';

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);
const io = socketio(expressServer);

io.on('connection', (socket) => {
  console.log(socket.id, 'has connected');
  //in ws we use send method and in socketio we use the emit method
  //socket.emit('messageFromServer', { data: 'Welcome to the socket server!' });
  socket.on('newMessageToServer', (dataFromClient) => {
    console.log('Data:', dataFromClient);
    io.emit('newMessageToClients', { text: dataFromClient.text });
  });
});
