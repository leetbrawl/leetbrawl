import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

// Example protected route
router.get('/dashboard', authenticate, (req: Request, res: Response) => {
  // req.user is guaranteed to exist because of authenticate middleware
  res.json({
    success: true,
    message: `Welcome to your dashboard, ${req.user!.username}!`,
    data: {
      user: req.user,
      timestamp: new Date().toISOString()
    }
  });
});

// Example route that needs user info
router.get('/my-stats', authenticate, (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Here are your stats',
    data: {
      userId: req.user!.id,
      username: req.user!.username,
      // In a real app, you'd fetch actual stats from database
      matches: 0,
      wins: 0,
      rating: 1200
    }
  });
});

export default router;