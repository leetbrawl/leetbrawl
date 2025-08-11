import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';
import { authenticate } from '../middleware/auth';
import { updateMatchStatistics } from '../utils/ratingSystem';

const router = Router();

interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

// POST /api/matches - create a new match
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { 
      type = 'RANKED', 
      timeLimit = 30, 
      maxPlayers = 2, 
      inviteCode,
      problemId,
      difficulty 
    } = req.body;
    const userId = req.user!.id;

    // Select a problem for the match
    let selectedProblemId = problemId;
    
    if (!selectedProblemId) {
      // If no specific problem requested, select randomly based on difficulty and type
      const whereClause: any = { isActive: true };
      
      if (difficulty) {
        whereClause.difficulty = difficulty;
      } else if (type === 'RANKED') {
        // For ranked matches, select appropriate difficulty based on user rating
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { rating: true }
        });
        
        if (user) {
          if (user.rating < 1000) {
            whereClause.difficulty = 'EASY';
          } else if (user.rating < 1400) {
            whereClause.difficulty = { in: ['EASY', 'MEDIUM'] };
          } else {
            // High-rated players get all difficulties
          }
        }
      }

      // Get random problem
      const problems = await prisma.problem.findMany({
        where: whereClause,
        select: { id: true },
        take: 10 // Get 10 and pick randomly to avoid always getting the same one
      });

      if (problems.length === 0) {
        return res.status(400).json({ error: 'No suitable problems available' });
      }

      selectedProblemId = problems[Math.floor(Math.random() * problems.length)].id;
    } else {
      // Verify the requested problem exists and is active
      const problem = await prisma.problem.findUnique({
        where: { id: problemId, isActive: true }
      });

      if (!problem) {
        return res.status(404).json({ error: 'Problem not found or inactive' });
      }
    }

    const match = await prisma.match.create({
      data: {
        status: 'WAITING',
        type,
        timeLimit,
        maxPlayers,
        inviteCode: type === 'PRIVATE' ? inviteCode || generateInviteCode() : null,
        problemId: selectedProblemId,
        users: {
          connect: { id: userId }
        }
      },
      include: {
        users: {
          select: { id: true, username: true, rating: true }
        },
        problem: {
          select: { 
            id: true, 
            title: true, 
            difficulty: true, 
            timeLimit: true,
            tags: true 
          }
        }
      }
    });

    res.status(201).json(match);
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({ error: 'Failed to create match' });
  }
});

// POST /api/matches/:matchId/join - join an existing match
router.post('/:matchId/join', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { matchId } = req.params;
    const { inviteCode } = req.body;
    const userId = req.user!.id;

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        users: true
      }
    });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    if (match.status !== 'WAITING') {
      return res.status(400).json({ error: 'Match is not accepting players' });
    }

    if (match.users.length >= match.maxPlayers) {
      return res.status(400).json({ error: 'Match is full' });
    }

    if (match.users.some(user => user.id === userId)) {
      return res.status(400).json({ error: 'Already in this match' });
    }

    if (match.type === 'PRIVATE' && match.inviteCode !== inviteCode) {
      return res.status(401).json({ error: 'Invalid invite code' });
    }

    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: {
        users: {
          connect: { id: userId }
        },
        status: match.users.length + 1 >= match.maxPlayers ? 'IN_PROGRESS' : 'WAITING',
        startedAt: match.users.length + 1 >= match.maxPlayers ? new Date() : null
      },
      include: {
        users: {
          select: { id: true, username: true, rating: true }
        }
      }
    });

    res.json(updatedMatch);
  } catch (error) {
    console.error('Error joining match:', error);
    res.status(500).json({ error: 'Failed to join match' });
  }
});

// GET /api/matches - list available matches (ELO-based for RANKED)
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { type = 'RANKED' } = req.query;
    const userId = req.user!.id;
    
    if (type === 'RANKED') {
      // Get user's rating for ELO-based matching
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { rating: true }
      });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const userRating = user.rating;
      const ratingRange = 200;
      //todo: this logic should be changed, will take a pook at how real games do it (like if nobodys playing it increases or sm)

      //ranked
      const matches = await prisma.match.findMany({
        where: {
          status: 'WAITING',
          type: 'RANKED',
          users: {
            every: {
              rating: {
                gte: userRating - ratingRange,
                lte: userRating + ratingRange
              }
            }
          }
        },
        include: {
          users: {
            select: { id: true, username: true, rating: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      });
      
      return res.json(matches);
    }
    
    // For CASUAL matches, no ELO filtering
    //todo: should have some implicit MMR rating so u dont get completely fucked
    const matches = await prisma.match.findMany({
      where: {
        status: 'WAITING',
        type: type as any,
        ...(type !== 'PRIVATE' && { inviteCode: null })
      },
      include: {
        users: {
          select: { id: true, username: true, rating: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// GET /api/matches/:matchId - get match details
router.get('/:matchId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { matchId } = req.params;
    const userId = req.user!.id;

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        users: {
          select: { id: true, username: true, rating: true }
        },
        problem: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty: true,
            timeLimit: true,
            memoryLimit: true,
            tags: true,
            category: true,
            constraints: true
          }
        },
        submissions: {
          include: {
            user: {
              select: { id: true, username: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Only allow players in the match to view details
    if (!match.users.some(user => user.id === userId)) {
      return res.status(403).json({ error: 'Not authorized to view this match' });
    }

    res.json(match);
  } catch (error) {
    console.error('Error fetching match:', error);
    res.status(500).json({ error: 'Failed to fetch match' });
  }
});

// PUT /api/matches/:matchId/complete - Complete a match and declare winner
router.put('/:matchId/complete', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { matchId } = req.params;
    const { winnerId, isDraw = false } = req.body;
    const userId = req.user!.id;

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        users: { select: { id: true } }
      }
    });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    if (match.status !== 'IN_PROGRESS') {
      return res.status(400).json({ error: 'Match is not in progress' });
    }

    // Only match participants can complete the match
    if (!match.users.some(user => user.id === userId)) {
      return res.status(403).json({ error: 'Not authorized to complete this match' });
    }

    // Validate winner is a participant (if not a draw)
    if (!isDraw && winnerId && !match.users.some(user => user.id === winnerId)) {
      return res.status(400).json({ error: 'Winner must be a match participant' });
    }

    // Update match status
    const completedMatch = await prisma.match.update({
      where: { id: matchId },
      data: {
        status: 'COMPLETED',
        winner: isDraw ? null : winnerId,
        completedAt: new Date()
      },
      include: {
        users: {
          select: { id: true, username: true, rating: true }
        }
      }
    });

    // Update user statistics and ratings
    await updateMatchStatistics(matchId, isDraw ? null : winnerId);

    res.json(completedMatch);
  } catch (error) {
    console.error('Error completing match:', error);
    res.status(500).json({ error: 'Failed to complete match' });
  }
});

// DELETE /api/matches/:matchId - Cancel a match
router.delete('/:matchId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { matchId } = req.params;
    const userId = req.user!.id;

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        users: { select: { id: true } }
      }
    });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    if (match.status === 'COMPLETED') {
      return res.status(400).json({ error: 'Cannot cancel completed match' });
    }

    // Only match participants can cancel
    if (!match.users.some(user => user.id === userId)) {
      return res.status(403).json({ error: 'Not authorized to cancel this match' });
    }

    const cancelledMatch = await prisma.match.update({
      where: { id: matchId },
      data: {
        status: 'CANCELLED',
        completedAt: new Date()
      }
    });

    res.json({ message: 'Match cancelled successfully', match: cancelledMatch });
  } catch (error) {
    console.error('Error cancelling match:', error);
    res.status(500).json({ error: 'Failed to cancel match' });
  }
});

// Helper function to generate invite codes
function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default router; 