import express, { Request, Response } from 'express';
import path from 'path';

import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3001',
  },
});

app.use(express.static(path.join(__dirname + '/public')));

app.use('/', async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'slack.html'));
});

console.log(`listening on port 3001`);

io.on('connection', (socket) => {
  console.log(socket.id, 'has connected');
  socket.emit('welcome', 'Welcome to the server');
});

httpServer.listen(3001);
