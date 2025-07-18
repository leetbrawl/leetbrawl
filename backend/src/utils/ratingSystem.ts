import { prisma } from '../config/database';

export interface EloResult {
  userId: string;
  oldRating: number;
  newRating: number;
  change: number;
}

/**
 * Calculate ELO rating changes for match participants
 * Uses standard ELO algorithm with K-factor of 32
 */
export async function calculateEloChanges(
  matchId: string,
  winnerId: string | null,
  isDraw: boolean = false
): Promise<EloResult[]> {
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      users: {
        select: { id: true, rating: true }
      }
    }
  });

  if (!match || match.users.length !== 2) {
    throw new Error('Match not found or not a 1v1 match');
  }

  const [player1, player2] = match.users;
  const K = 32; // ELO K-factor

  //todo: have to check on this
  const expectedScore1 = 1 / (1 + Math.pow(10, (player2.rating - player1.rating) / 400));
  const expectedScore2 = 1 / (1 + Math.pow(10, (player1.rating - player2.rating) / 400));

  // Determine actual scores
  let actualScore1: number, actualScore2: number;
  
  if (isDraw) {
    actualScore1 = actualScore2 = 0.5;
  } else {
    actualScore1 = winnerId === player1.id ? 1 : 0;
    actualScore2 = winnerId === player2.id ? 1 : 0;
  }

  // Calculate rating changes
  const change1 = Math.round(K * (actualScore1 - expectedScore1));
  const change2 = Math.round(K * (actualScore2 - expectedScore2));

  const newRating1 = Math.max(100, player1.rating + change1); // Minimum rating of 100
  const newRating2 = Math.max(100, player2.rating + change2);

  return [
    {
      userId: player1.id,
      oldRating: player1.rating,
      newRating: newRating1,
      change: change1
    },
    {
      userId: player2.id,
      oldRating: player2.rating,
      newRating: newRating2,
      change: change2
    }
  ];
}

/**
 * Update user statistics and rating after a match completion
 */
export async function updateMatchStatistics(
  matchId: string,
  winnerId: string | null
): Promise<void> {
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    include: {
      users: { select: { id: true } }
    }
  });

  if (!match) {
    throw new Error('Match not found');
  }

  const isDraw = winnerId === null;
  
  try {
    await prisma.$transaction(async (tx) => {
      // Update user statistics
      for (const user of match.users) {
        const isWinner = user.id === winnerId;
        const isLoser = winnerId !== null && user.id !== winnerId;

        await tx.user.update({
          where: { id: user.id },
          data: {
            totalMatches: { increment: 1 },
            wins: isWinner ? { increment: 1 } : undefined,
            losses: isLoser ? { increment: 1 } : undefined,
            draws: isDraw ? { increment: 1 } : undefined,
            lastActive: new Date()
          }
        });
      }

      // Calculate and update ELO ratings for RANKED matches
      if (match.type === 'RANKED') {
        const eloResults = await calculateEloChanges(matchId, winnerId, isDraw);
        
        for (const result of eloResults) {
          // Update user rating
          await tx.user.update({
            where: { id: result.userId },
            data: { rating: result.newRating }
          });

          // Record rating history
          await tx.ratingHistory.create({
            data: {
              userId: result.userId,
              matchId: matchId,
              oldRating: result.oldRating,
              newRating: result.newRating,
              change: result.change,
              matchType: 'RANKED'
            }
          });
        }
      }
    });
  } catch (error) {
    console.error('Error updating match statistics:', error);
    throw error;
  }
}

/**
 * Get user's rating history for trend analysis
 */
export async function getUserRatingTrend(
  userId: string,
  days: number = 30
): Promise<Array<{ rating: number; date: Date; change: number }>> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const history = await prisma.ratingHistory.findMany({
    where: {
      userId,
      createdAt: { gte: cutoffDate }
    },
    orderBy: { createdAt: 'asc' },
    select: {
      newRating: true,
      change: true,
      createdAt: true
    }
  });

  return history.map(entry => ({
    rating: entry.newRating,
    change: entry.change,
    date: entry.createdAt
  }));
}

/**
 * Calculate user's percentile ranking
 */
export async function getUserPercentile(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { rating: true }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const totalUsers = await prisma.user.count({
    where: { totalMatches: { gt: 0 } }
  });

  const usersBelow = await prisma.user.count({
    where: {
      totalMatches: { gt: 0 },
      rating: { lt: user.rating }
    }
  });

  return Math.round((usersBelow / totalUsers) * 100);
}