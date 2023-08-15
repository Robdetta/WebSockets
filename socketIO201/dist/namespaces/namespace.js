"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const socket_io_1 = require("socket.io");
app.use(express_1.default.static(__dirname + '/public'));
const expressServer = app.listen(8001);
const io = new socket_io_1.Server(expressServer);
io.on('connection', (socket) => {
    console.log(socket.id, 'has connected');
    socket.on('newMessageToServer', (dataFromClient) => {
        console.log('Data:', dataFromClient);
        io.emit('newMessageToClients', { text: dataFromClient.text });
    });
});
