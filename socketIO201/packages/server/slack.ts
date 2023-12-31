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

//manufactured way to change a namespace(without building huge UI)
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
    socket.on('joinRoom', async (roomObj, ackCallBack) => {
      //need to fetch the history
      const thisNs = namespaces[roomObj.namespaceId];
      const thisRoomObj = thisNs.rooms.find(
        (room) => room.roomTitle === roomObj.roomTitle,
      );
      const thisRoomHistory = thisRoomObj?.history;

      //leave all rooms, because the client can only be in one room
      const rooms = socket.rooms;
      //console.log(rooms);
      let i = 0;
      rooms.forEach((room) => {
        //we don't want to leave the sockets personal room which is not guaranteed
        if (i !== 0) {
          socket.leave(room);
        }
        i++;
      });

      //ROOM Title is coming from client
      //some kind of auth here
      socket.join(roomObj.roomTitle);
      //fetch the number of sockets in this room
      const sockets = await io
        .of(namespace.endpoint)
        .in(roomObj.roomTitle)
        .fetchSockets();

      const socketCount = sockets.length;
      ackCallBack({
        numUsers: socketCount,
        thisRoomHistory: thisRoomHistory,
      });
    });
    socket.on('newMessageToRoom', (messageObj) => {
      console.log(messageObj);
      //braodcast this to all the connected clients... this room only

      const rooms = Array.from(socket.rooms);
      const currentRoom = rooms[1];

      //send out the messageObj to everyone including the sender
      io.of(namespace.endpoint)
        .in(currentRoom)
        .emit('messageToRoom', messageObj);
      //add this message to this room's history
      const thisNs = namespaces[messageObj.nsId];
      const thisRoom = thisNs.rooms.find(
        (room) => room.roomTitle === currentRoom,
      );
      console.log(thisRoom);
      thisRoom?.addMessage(messageObj);
    });
  });
});
