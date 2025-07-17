import { Router } from 'express';

const router = Router();

// POST /api/matches - create or join a match (dummy implementation)

router.post('/', (req, res) => {
  // In a real implementation, match creation/join logic would go here
  res.json({
    id: 'match_123',
    status: 'waiting',
    problemId: 'problem_1',
    createdAt: new Date().toISOString(),
    players: ['user_1'],
  });
});

export default router; 