import express from 'express';
const app = express();
import { Server } from 'socket.io';

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8001);

const io = new Server(expressServer);

io.on('connection', (socket) => {
  console.log(socket.id, 'has connected');
  socket.on('newMessageToServer', (dataFromClient) => {
    console.log('Data:', dataFromClient);
    io.emit('newMessageToClients', { text: dataFromClient.text });
  });
});
