import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173' }
});

io.on('connection', (socket) => {
  console.log('connected', socket.id);

  socket.on('ping', (count: number) => {
    socket.emit('pong', count);
  });
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
