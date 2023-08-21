import express, { Response, Request } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { namespaces } from '../client/src/data/namespaces';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

const server = createServer(app);

// Create a separate Socket.io server instance for each namespace

//always join the main namespace, becauses that is where the client gets the name spaces from
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

server.listen(3000, () => {
  console.log(`listening on port ${3000}`);
});

//manufactured way to change a nameshape(without building huge UI)
app.get('/change-ns', (req: Request, res: Response) => {
  //update namespaces array
  //namespaces[0].addRoom(new Room(0, 'Deleted Articles', 0));
  //let everyone know in THIS namespace, that it changed
  io.of(namespaces[0].endpoint).emit('nsChange', namespaces[0]);
  res.json(namespaces[0]);
});

io.on('connection', (socket: Socket) => {
  socket.emit('welcome', 'Welcome to the server!');
  socket.on('clientConnect', () => {
    console.log(socket.id, 'has connected');
    socket.emit('nsList', namespaces);
  });
});

//Create separate namespaces using .of(namespace)
namespaces.forEach((namespace) => {
  const thisNs = io.of(namespace.endpoint);
  thisNs.on('connection', (socket: Socket) => {
    //console.log(`${socket.id} has connected to ${namespace.endpoint}`);
    socket.on('joinRoom', (roomTitle) => {
      socket.join(roomTitle);
    });
  });
});
