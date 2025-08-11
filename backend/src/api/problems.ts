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

// GET /api/problems - List all problems with pagination and filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      difficulty, 
      category, 
      tags, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = Math.min(parseInt(limit as string), 50);
    const skip = (pageNum - 1) * limitNum;

    const whereClause: any = {
      isActive: true
    };

    if (difficulty) {
      whereClause.difficulty = difficulty;
    }

    if (category) {
      whereClause.category = category;
    }

    if (tags) {
      const tagArray = (tags as string).split(',');
      whereClause.tags = {
        hasSome: tagArray
      };
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const orderBy: any = {};
    orderBy[sortBy as string] = sortOrder;

    const [problems, totalCount] = await Promise.all([
      prisma.problem.findMany({
        where: whereClause,
        orderBy,
        skip,
        take: limitNum,
        select: {
          id: true,
          title: true,
          difficulty: true,
          category: true,
          tags: true,
          totalAttempts: true,
          totalSolved: true,
          timeLimit: true,
          memoryLimit: true,
          createdAt: true
        }
      }),
      prisma.problem.count({ where: whereClause })
    ]);

    // Calculate success rate for each problem
    const enrichedProblems = problems.map(problem => ({
      ...problem,
      successRate: problem.totalAttempts > 0 
        ? Math.round((problem.totalSolved / problem.totalAttempts) * 100) 
        : 0
    }));

    res.json({
      problems: enrichedProblems,
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
    console.error('Error fetching problems:', error);
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

// GET /api/problems/:problemId - Get detailed problem information
router.get('/:problemId', async (req: Request, res: Response) => {
  try {
    const { problemId } = req.params;

    const problem = await prisma.problem.findUnique({
      where: { id: problemId, isActive: true },
      include: {
        examples: {
          orderBy: { id: 'asc' }
        },
        // Don't include hidden test cases in public API
        testCases: {
          where: { isHidden: false },
          select: {
            id: true,
            input: true,
            output: true,
            weight: true
          }
        }
      }
    });

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    // Calculate success rate
    const successRate = problem.totalAttempts > 0 
      ? Math.round((problem.totalSolved / problem.totalAttempts) * 100) 
      : 0;

    res.json({
      ...problem,
      successRate,
      // Don't expose sensitive test cases
      testCases: problem.testCases
    });
  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({ error: 'Failed to fetch problem details' });
  }
});

// POST /api/problems - Create new problem (admin/authenticated users only)
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      difficulty,
      timeLimit = 30,
      memoryLimit = 256,
      tags = [],
      category = 'algorithms',
      constraints,
      examples = [],
      testCases = []
    } = req.body;

    // Basic validation
    if (!title || !description || !difficulty) {
      return res.status(400).json({
        error: 'Title, description, and difficulty are required'
      });
    }

    if (!['EASY', 'MEDIUM', 'HARD'].includes(difficulty)) {
      return res.status(400).json({
        error: 'Difficulty must be EASY, MEDIUM, or HARD'
      });
    }

    if (examples.length === 0) {
      return res.status(400).json({
        error: 'At least one example is required'
      });
    }

    if (testCases.length === 0) {
      return res.status(400).json({
        error: 'At least one test case is required'
      });
    }

    // Create problem with examples and test cases
    const problem = await prisma.problem.create({
      data: {
        title,
        description,
        difficulty,
        timeLimit,
        memoryLimit,
        tags,
        category,
        constraints,
        examples: {
          create: examples.map((example: any) => ({
            input: example.input,
            output: example.output,
            explanation: example.explanation || null
          }))
        },
        testCases: {
          create: testCases.map((testCase: any) => ({
            input: testCase.input,
            output: testCase.output,
            isHidden: testCase.isHidden !== false, // Default to hidden
            weight: testCase.weight || 1
          }))
        }
      },
      include: {
        examples: true,
        testCases: {
          select: {
            id: true,
            input: true,
            output: true,
            isHidden: true,
            weight: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Problem created successfully',
      problem
    });
  } catch (error) {
    console.error('Error creating problem:', error);
    res.status(500).json({ error: 'Failed to create problem' });
  }
});

// PUT /api/problems/:problemId - Update problem (admin/authenticated users only)
router.put('/:problemId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { problemId } = req.params;
    const {
      title,
      description,
      difficulty,
      timeLimit,
      memoryLimit,
      tags,
      category,
      constraints,
      isActive
    } = req.body;

    const existingProblem = await prisma.problem.findUnique({
      where: { id: problemId }
    });

    if (!existingProblem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (difficulty !== undefined) updateData.difficulty = difficulty;
    if (timeLimit !== undefined) updateData.timeLimit = timeLimit;
    if (memoryLimit !== undefined) updateData.memoryLimit = memoryLimit;
    if (tags !== undefined) updateData.tags = tags;
    if (category !== undefined) updateData.category = category;
    if (constraints !== undefined) updateData.constraints = constraints;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedProblem = await prisma.problem.update({
      where: { id: problemId },
      data: updateData,
      include: {
        examples: true,
        testCases: {
          select: {
            id: true,
            input: true,
            output: true,
            isHidden: true,
            weight: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Problem updated successfully',
      problem: updatedProblem
    });
  } catch (error) {
    console.error('Error updating problem:', error);
    res.status(500).json({ error: 'Failed to update problem' });
  }
});

// DELETE /api/problems/:problemId - Soft delete problem (admin only)
router.delete('/:problemId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { problemId } = req.params;

    const existingProblem = await prisma.problem.findUnique({
      where: { id: problemId }
    });

    if (!existingProblem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    // Soft delete by setting isActive to false
    await prisma.problem.update({
      where: { id: problemId },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Problem deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting problem:', error);
    res.status(500).json({ error: 'Failed to delete problem' });
  }
});

// GET /api/problems/categories - Get all problem categories
router.get('/meta/categories', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.problem.groupBy({
      by: ['category'],
      where: { isActive: true },
      _count: { category: true }
    });

    res.json({
      categories: categories.map(cat => ({
        name: cat.category,
        count: cat._count.category
      }))
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/problems/tags - Get all problem tags
router.get('/meta/tags', async (req: Request, res: Response) => {
  try {
    const problems = await prisma.problem.findMany({
      where: { isActive: true },
      select: { tags: true }
    });

    // Flatten and count tags
    const tagCounts: Record<string, number> = {};
    problems.forEach(problem => {
      problem.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const tags = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    res.json({ tags });
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// GET /api/problems/stats - Get problem statistics
router.get('/meta/stats', async (req: Request, res: Response) => {
  try {
    const [totalProblems, difficultyStats, categoryStats] = await Promise.all([
      prisma.problem.count({ where: { isActive: true } }),
      prisma.problem.groupBy({
        by: ['difficulty'],
        where: { isActive: true },
        _count: { difficulty: true }
      }),
      prisma.problem.groupBy({
        by: ['category'],
        where: { isActive: true },
        _count: { category: true }
      })
    ]);

    res.json({
      totalProblems,
      byDifficulty: difficultyStats.reduce((acc, stat) => {
        acc[stat.difficulty] = stat._count.difficulty;
        return acc;
      }, {} as Record<string, number>),
      byCategory: categoryStats.reduce((acc, stat) => {
        acc[stat.category] = stat._count.category;
        return acc;
      }, {} as Record<string, number>)
    });
  } catch (error) {
    console.error('Error fetching problem stats:', error);
    res.status(500).json({ error: 'Failed to fetch problem statistics' });
  }
});

export default router;