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

// GET /api/analytics/me/rating-history - Complete rating history with no limits
router.get('/me/rating-history', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { startDate, endDate, matchType } = req.query;

    const whereClause: any = { userId };
    
    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) whereClause.createdAt.gte = new Date(startDate as string);
      if (endDate) whereClause.createdAt.lte = new Date(endDate as string);
    }
    
    if (matchType) {
      whereClause.matchType = matchType;
    }

    const ratingHistory = await prisma.ratingHistory.findMany({
      where: whereClause,
      orderBy: { createdAt: 'asc' }
    });

    // Add peak and lowest ratings
    const ratings = ratingHistory.map(h => h.newRating);
    const peakRating = Math.max(...ratings, 1200); // Include starting rating
    const lowestRating = Math.min(...ratings, 1200);

    res.json({
      history: ratingHistory,
      summary: {
        totalGames: ratingHistory.length,
        peakRating,
        lowestRating,
        currentRating: ratings[ratings.length - 1] || 1200,
        totalRatingChange: (ratings[ratings.length - 1] || 1200) - 1200
      }
    });
  } catch (error) {
    console.error('Error fetching rating history:', error);
    res.status(500).json({ error: 'Failed to fetch rating history' });
  }
});

// GET /api/analytics/me/match-history - Complete match history with advanced filtering
router.get('/me/match-history', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { 
      page = 1, 
      limit = 50, 
      status, 
      type, 
      result,
      startDate, 
      endDate,
      opponent 
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = Math.min(parseInt(limit as string), 100);
    const skip = (pageNum - 1) * limitNum;

    const whereClause: any = {
      users: { some: { id: userId } }
    };

    if (status) whereClause.status = status;
    if (type) whereClause.type = type;
    
    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) whereClause.createdAt.gte = new Date(startDate as string);
      if (endDate) whereClause.createdAt.lte = new Date(endDate as string);
    }

    if (opponent) {
      whereClause.users = {
        some: { 
          AND: [
            { id: { not: userId } },
            { username: { contains: opponent, mode: 'insensitive' } }
          ]
        }
      };
    }

    const [matches, totalCount] = await Promise.all([
      prisma.match.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
        include: {
          users: {
            select: { id: true, username: true, rating: true }
          },
          submissions: {
            where: { userId },
            select: { 
              id: true,
              verdict: true, 
              language: true, 
              executionTime: true,
              memoryUsed: true,
              createdAt: true 
            }
          },
          _count: {
            select: { submissions: true }
          }
        }
      }),
      prisma.match.count({ where: whereClause })
    ]);

    const enrichedMatches = matches.map(match => {
      const isWin = match.winner === userId;
      const isLoss = match.winner && match.winner !== userId;
      const isDraw = !match.winner && match.status === 'COMPLETED';
      const opponent = match.users.find(u => u.id !== userId);

      return {
        ...match,
        result: isWin ? 'WIN' : isLoss ? 'LOSS' : isDraw ? 'DRAW' : 'ONGOING',
        opponent,
        userSubmissions: match.submissions,
        totalSubmissions: match._count.submissions
      };
    });

    // Filter by result if specified
    let filteredMatches = enrichedMatches;
    if (result) {
      filteredMatches = enrichedMatches.filter(m => m.result === result.toString().toUpperCase());
    }

    res.json({
      matches: filteredMatches,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages: Math.ceil(totalCount / limitNum),
        hasNext: pageNum * limitNum < totalCount,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching match history:', error);
    res.status(500).json({ error: 'Failed to fetch match history' });
  }
});

// GET /api/analytics/me/head-to-head/:opponentId - Head-to-head statistics
router.get('/me/head-to-head/:opponentId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { opponentId } = req.params;

    // Verify opponent exists
    const opponent = await prisma.user.findUnique({
      where: { id: opponentId },
      select: { id: true, username: true, rating: true }
    });

    if (!opponent) {
      return res.status(404).json({ error: 'Opponent not found' });
    }

    // Get all matches between these two players
    const matches = await prisma.match.findMany({
      where: {
        AND: [
          { users: { some: { id: userId } } },
          { users: { some: { id: opponentId } } },
          { status: 'COMPLETED' }
        ]
      },
      orderBy: { completedAt: 'desc' },
      include: {
        users: {
          select: { id: true, username: true, rating: true }
        },
        submissions: {
          select: {
            userId: true,
            verdict: true,
            executionTime: true,
            createdAt: true
          }
        }
      }
    });

    // Calculate head-to-head statistics
    let userWins = 0;
    let opponentWins = 0;
    let draws = 0;
    let totalMatches = matches.length;

    const matchDetails = matches.map(match => {
      const result = match.winner === userId ? 'WIN' : 
                    match.winner === opponentId ? 'LOSS' : 'DRAW';
      
      if (result === 'WIN') userWins++;
      else if (result === 'LOSS') opponentWins++;
      else draws++;

      const userSubmissions = match.submissions.filter(s => s.userId === userId);
      const opponentSubmissions = match.submissions.filter(s => s.userId === opponentId);

      return {
        matchId: match.id,
        result,
        matchType: match.type,
        completedAt: match.completedAt,
        userSubmissions: userSubmissions.length,
        opponentSubmissions: opponentSubmissions.length,
        userFastestTime: userSubmissions.reduce((min: number | null, s) => 
          s.executionTime && (!min || s.executionTime < min) ? s.executionTime : min, null as number | null),
        opponentFastestTime: opponentSubmissions.reduce((min: number | null, s) => 
          s.executionTime && (!min || s.executionTime < min) ? s.executionTime : min, null as number | null)
      };
    });

    // Calculate win rate
    const winRate = totalMatches > 0 ? (userWins / totalMatches * 100) : 0;

    // Recent form (last 10 matches)
    const recentForm = matchDetails.slice(0, 10).map(m => m.result);

    res.json({
      opponent,
      summary: {
        totalMatches,
        wins: userWins,
        losses: opponentWins,
        draws,
        winRate: Math.round(winRate * 100) / 100,
        recentForm
      },
      matches: matchDetails
    });
  } catch (error) {
    console.error('Error fetching head-to-head stats:', error);
    res.status(500).json({ error: 'Failed to fetch head-to-head statistics' });
  }
});

// GET /api/analytics/me/performance - Performance analytics over time
router.get('/me/performance', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { period = 'month', groupBy = 'week' } = req.query;

    // Calculate date range
    const now = new Date();
    const startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 1);
    }

    // Get matches in period
    const matches = await prisma.match.findMany({
      where: {
        users: { some: { id: userId } },
        status: 'COMPLETED',
        completedAt: { gte: startDate }
      },
      orderBy: { completedAt: 'asc' },
      include: {
        submissions: {
          where: { userId },
          select: { verdict: true, executionTime: true, memoryUsed: true }
        }
      }
    });

    // Group matches by time period
    const grouped = matches.reduce((acc, match) => {
      if (!match.completedAt) return acc;
      
      const date = new Date(match.completedAt);
      let key: string;
      
      if (groupBy === 'day') {
        key = date.toISOString().split('T')[0];
      } else if (groupBy === 'week') {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
      } else {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      }

      if (!acc[key]) {
        acc[key] = { matches: [], wins: 0, losses: 0, draws: 0 };
      }
      
      acc[key].matches.push(match);
      
      if (match.winner === userId) acc[key].wins++;
      else if (match.winner) acc[key].losses++;
      else acc[key].draws++;
      
      return acc;
    }, {} as Record<string, any>);

    // Calculate performance metrics for each period
    const performanceData = Object.entries(grouped).map(([period, data]) => {
      const total = data.matches.length;
      const winRate = total > 0 ? (data.wins / total * 100) : 0;
      
      const avgExecutionTime = data.matches.reduce((sum: number, match: any) => {
        const times = match.submissions.map((s: any) => s.executionTime).filter(Boolean);
        return sum + (times.length > 0 ? times.reduce((a: number, b: number) => a + b, 0) / times.length : 0);
      }, 0) / total;

      return {
        period,
        totalMatches: total,
        wins: data.wins,
        losses: data.losses,
        draws: data.draws,
        winRate: Math.round(winRate * 100) / 100,
        avgExecutionTime: avgExecutionTime || null
      };
    }).sort((a, b) => a.period.localeCompare(b.period));

    res.json({
      period,
      groupBy,
      data: performanceData
    });
  } catch (error) {
    console.error('Error fetching performance analytics:', error);
    res.status(500).json({ error: 'Failed to fetch performance analytics' });
  }
});

// GET /api/analytics/me/streaks - Current and historical streaks
router.get('/me/streaks', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // Get all completed matches ordered by completion date
    const matches = await prisma.match.findMany({
      where: {
        users: { some: { id: userId } },
        status: 'COMPLETED'
      },
      orderBy: { completedAt: 'desc' },
      select: {
        id: true,
        winner: true,
        completedAt: true,
        type: true
      }
    });

    if (matches.length === 0) {
      return res.json({
        currentStreak: { type: null, count: 0, startDate: null },
        longestWinStreak: { count: 0, startDate: null, endDate: null },
        longestLossStreak: { count: 0, startDate: null, endDate: null }
      });
    }

    // Calculate current streak
    let currentStreakType: 'win' | 'loss' | 'draw' | null = null;
    let currentStreakCount = 0;
    let currentStreakStart: Date | null = null;

    for (const match of matches) {
      const result = match.winner === userId ? 'win' : 
                    match.winner === null ? 'draw' : 'loss';
      
      if (currentStreakType === null) {
        currentStreakType = result;
        currentStreakCount = 1;
        currentStreakStart = match.completedAt;
      } else if (currentStreakType === result) {
        currentStreakCount++;
        currentStreakStart = match.completedAt;
      } else {
        break;
      }
    }

    // Calculate historical streaks
    let longestWinStreak = { count: 0, startDate: null as Date | null, endDate: null as Date | null };
    let longestLossStreak = { count: 0, startDate: null as Date | null, endDate: null as Date | null };
    
    let currentWinStreak = 0;
    let currentLossStreak = 0;
    let winStreakStart: Date | null = null;
    let lossStreakStart: Date | null = null;

    // Process matches in chronological order for historical streaks
    const chronologicalMatches = [...matches].reverse();
    
    for (const match of chronologicalMatches) {
      const result = match.winner === userId ? 'win' : 
                    match.winner === null ? 'draw' : 'loss';
      
      if (result === 'win') {
        if (currentWinStreak === 0) winStreakStart = match.completedAt;
        currentWinStreak++;
        
        if (currentWinStreak > longestWinStreak.count) {
          longestWinStreak = {
            count: currentWinStreak,
            startDate: winStreakStart,
            endDate: match.completedAt
          };
        }
        
        currentLossStreak = 0;
      } else if (result === 'loss') {
        if (currentLossStreak === 0) lossStreakStart = match.completedAt;
        currentLossStreak++;
        
        if (currentLossStreak > longestLossStreak.count) {
          longestLossStreak = {
            count: currentLossStreak,
            startDate: lossStreakStart,
            endDate: match.completedAt
          };
        }
        
        currentWinStreak = 0;
      } else {
        // Draw breaks both streaks
        currentWinStreak = 0;
        currentLossStreak = 0;
      }
    }

    res.json({
      currentStreak: {
        type: currentStreakType,
        count: currentStreakCount,
        startDate: currentStreakStart
      },
      longestWinStreak,
      longestLossStreak
    });
  } catch (error) {
    console.error('Error fetching streak data:', error);
    res.status(500).json({ error: 'Failed to fetch streak data' });
  }
});

export default router;