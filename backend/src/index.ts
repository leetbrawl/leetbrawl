import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import matchesRouter from './api/matches';
import usersRouter from './api/users';
import friendsRouter from './api/friends';
import analyticsRouter from './api/analytics';
import authRouter from './routes/auth';
import protectedRouter from './routes/protected';
import { setupSocket } from './sockets';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Authentication routes
app.use('/auth', authRouter);

// Protected routes
app.use('/api/protected', protectedRouter);

// API routes
app.use('/api/matches', matchesRouter);
app.use('/api/users', usersRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/analytics', analyticsRouter);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Socket.IO setup
setupSocket(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
}); 