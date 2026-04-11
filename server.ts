import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { registerHandlers } from './server/handlers.ts';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173' },
});

registerHandlers(io);

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
