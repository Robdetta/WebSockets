import express from 'express';
const port = process.env.PORT || 3000;
const app = express();
import { Server } from 'socket.io';

app.use(express.static(__dirname + '/public'));

//const expressServer = app.listen(8000);

app.get('/api/v1/hello', (_req, res) => {
  res.json({ message: 'Hello, World' });
});

app.listen(port, () => {
  console.log('Server listening on port', port);
});

//const io = new Server(expressServer);
// io.on('connection', (socket) => {
//   console.log(socket.id, 'has connected');
//   socket.emit('welcome', 'Welcome to the server');
// });
