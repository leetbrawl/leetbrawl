import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import matchesRouter from './api/matches';
import { setupSocket } from './sockets';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// REST API routes
app.use('/api/matches', matchesRouter);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Socket.IO setup
setupSocket(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
}); 