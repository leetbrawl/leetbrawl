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

// Note: This requires a Friendship model to be added to the Prisma schema
// For now, implementing the logic assuming the model exists

// GET /api/friends - Get user's friends list
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // This would work if we had a Friendship model
    // For now, return empty array with structure
    const friends: any[] = []; // TODO: Implement when Friendship model is added

    res.json({
      friends,
      totalCount: friends.length
    });
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ error: 'Failed to fetch friends list' });
  }
});

// GET /api/friends/requests - Get pending friend requests
router.get('/requests', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // TODO: Implement when Friendship model is added
    const incomingRequests: any[] = [];
    const outgoingRequests: any[] = [];

    res.json({
      incoming: incomingRequests,
      outgoing: outgoingRequests
    });
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    res.status(500).json({ error: 'Failed to fetch friend requests' });
  }
});

// POST /api/friends/request - Send friend request
router.post('/request', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { targetUsername } = req.body;

    if (!targetUsername) {
      return res.status(400).json({ error: 'Target username is required' });
    }

    // Find target user
    const targetUser = await prisma.user.findUnique({
      where: { username: targetUsername },
      select: { id: true, username: true }
    });

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (targetUser.id === userId) {
      return res.status(400).json({ error: 'Cannot send friend request to yourself' });
    }

    // TODO: Check if friendship already exists
    // TODO: Create friendship request

    res.status(201).json({
      message: 'Friend request sent successfully',
      targetUser: targetUser.username
    });
  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: 'Failed to send friend request' });
  }
});

// PUT /api/friends/requests/:requestId/accept - Accept friend request
router.put('/requests/:requestId/accept', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { requestId } = req.params;

    // TODO: Implement when Friendship model is added
    res.json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    res.status(500).json({ error: 'Failed to accept friend request' });
  }
});

// DELETE /api/friends/requests/:requestId - Decline/cancel friend request
router.delete('/requests/:requestId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { requestId } = req.params;

    // TODO: Implement when Friendship model is added
    res.json({ message: 'Friend request declined' });
  } catch (error) {
    console.error('Error declining friend request:', error);
    res.status(500).json({ error: 'Failed to decline friend request' });
  }
});

// DELETE /api/friends/:friendId - Remove friend
router.delete('/:friendId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { friendId } = req.params;

    // TODO: Implement when Friendship model is added
    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error('Error removing friend:', error);
    res.status(500).json({ error: 'Failed to remove friend' });
  }
});

// GET /api/friends/search - Search for users to add as friends
router.get('/search', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { query } = req.query;

    if (!query || typeof query !== 'string' || query.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userId } }, // Exclude current user
          {
            OR: [
              { username: { contains: query, mode: 'insensitive' } },
              { name: { contains: query, mode: 'insensitive' } }
            ]
          }
        ]
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        rating: true
      },
      take: 20
    });

    res.json({ users });
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

export default router;