import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';

export function setupSocket(server: HTTPServer) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    // Add event handlers here
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
} 