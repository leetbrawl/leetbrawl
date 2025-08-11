const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Simple auth test without Prisma
app.post('/auth/test', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  res.json({ 
    success: true, 
    message: 'Test endpoint working',
    data: { username, receivedPassword: !!password }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Test server listening on port ${PORT}`);
});