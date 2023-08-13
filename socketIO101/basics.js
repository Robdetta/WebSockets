import express from 'express';
const app = express();
import socketio from 'socket.io';

const expressServer = app.listen(8000);
const io = socketio(expressServer);
