import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';
import { authenticate } from '../middleware/auth';

const router = Router();

interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

// GET /api/users/me/stats - Get current user's detailed statistics
router.get('/me/stats', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        rating: true,
        wins: true,
        losses: true,
        draws: true,
        totalMatches: true,
        createdAt: true,
        lastActive: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get recent rating history (limited for dashboard)
    const ratingHistory = await prisma.ratingHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10 // Reduced for dashboard, full history available in analytics
    });

    // Get recent matches
    const recentMatches = await prisma.match.findMany({
      where: {
        users: { some: { id: userId } },
        status: 'COMPLETED'
      },
      orderBy: { completedAt: 'desc' },
      take: 10,
      include: {
        users: {
          select: { id: true, username: true, rating: true }
        }
      }
    });

    // Calculate win rate
    const totalGames = user.wins + user.losses + user.draws;
    const winRate = totalGames > 0 ? (user.wins / totalGames * 100) : 0;

    // Calculate current streak
    const streak = await calculateStreak(userId);

    // Get submission statistics
    const submissionStats = await prisma.submission.groupBy({
      by: ['verdict'],
      where: { userId },
      _count: { verdict: true }
    });

    const stats = {
      user: {
        ...user,
        winRate: Math.round(winRate * 100) / 100,
        currentStreak: streak
      },
      ratingHistory,
      recentMatches,
      submissionStats: submissionStats.reduce((acc, stat) => {
        acc[stat.verdict] = stat._count.verdict;
        return acc;
      }, {} as Record<string, number>)
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user statistics' });
  }
});

// GET /api/users/:userId/profile - Get another user's public profile
router.get('/:userId/profile', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        rating: true,
        wins: true,
        losses: true,
        draws: true,
        totalMatches: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Public rating history (limited)
    const ratingHistory = await prisma.ratingHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        oldRating: true,
        newRating: true,
        change: true,
        createdAt: true,
        matchType: true
      }
    });

    const totalGames = user.wins + user.losses + user.draws;
    const winRate = totalGames > 0 ? (user.wins / totalGames * 100) : 0;

    const profile = {
      ...user,
      winRate: Math.round(winRate * 100) / 100,
      ratingHistory
    };

    res.json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// GET /api/users/me/matches - Get current user's match history with pagination
router.get('/me/matches', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
    const status = req.query.status as string;
    const type = req.query.type as string;

    const skip = (page - 1) * limit;

    const whereClause: any = {
      users: { some: { id: userId } }
    };

    if (status) {
      whereClause.status = status;
    }

    if (type) {
      whereClause.type = type;
    }

    const [matches, totalCount] = await Promise.all([
      prisma.match.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          users: {
            select: { id: true, username: true, rating: true }
          },
          submissions: {
            where: { userId },
            select: { verdict: true, language: true, createdAt: true }
          }
        }
      }),
      prisma.match.count({ where: whereClause })
    ]);

    const enrichedMatches = matches.map(match => ({
      ...match,
      isWin: match.winner === userId,
      isLoss: match.winner && match.winner !== userId,
      isDraw: !match.winner && match.status === 'COMPLETED'
    }));

    res.json({
      matches: enrichedMatches,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching match history:', error);
    res.status(500).json({ error: 'Failed to fetch match history' });
  }
});

// GET /api/users/leaderboard - Get top players leaderboard
router.get('/leaderboard', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const skip = (page - 1) * limit;

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: {
          totalMatches: { gt: 0 } // Only users who have played matches
        },
        orderBy: [
          { rating: 'desc' },
          { wins: 'desc' },
          { totalMatches: 'desc' }
        ],
        skip,
        take: limit,
        select: {
          id: true,
          username: true,
          name: true,
          avatar: true,
          rating: true,
          wins: true,
          losses: true,
          draws: true,
          totalMatches: true
        }
      }),
      prisma.user.count({
        where: { totalMatches: { gt: 0 } }
      })
    ]);

    const leaderboard = users.map((user, index) => {
      const totalGames = user.wins + user.losses + user.draws;
      const winRate = totalGames > 0 ? (user.wins / totalGames * 100) : 0;
      
      return {
        ...user,
        rank: skip + index + 1,
        winRate: Math.round(winRate * 100) / 100
      };
    });

    res.json({
      leaderboard,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Helper function to calculate current win/loss streak
async function calculateStreak(userId: string): Promise<{ type: 'win' | 'loss' | 'draw' | null, count: number }> {
  const recentMatches = await prisma.match.findMany({
    where: {
      users: { some: { id: userId } },
      status: 'COMPLETED'
    },
    orderBy: { completedAt: 'desc' },
    take: 20,
    select: { winner: true }
  });

  if (recentMatches.length === 0) {
    return { type: null, count: 0 };
  }

  const firstMatch = recentMatches[0];
  let streakType: 'win' | 'loss' | 'draw';
  
  if (firstMatch.winner === userId) {
    streakType = 'win';
  } else if (firstMatch.winner === null) {
    streakType = 'draw';
  } else {
    streakType = 'loss';
  }

  let streakCount = 1;
  
  for (let i = 1; i < recentMatches.length; i++) {
    const match = recentMatches[i];
    const currentType = match.winner === userId ? 'win' : 
                       match.winner === null ? 'draw' : 'loss';
    
    if (currentType === streakType) {
      streakCount++;
    } else {
      break;
    }
  }

  return { type: streakType, count: streakCount };
}

export default router;