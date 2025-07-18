import { Request, Response } from 'express';
import { AuthService } from './authService';
import { prisma } from '../config/database';

export class AuthController {
  // POST /auth/register
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      // Basic validation
      if (!username || !email || !password) {
        return res.status(400).json({
          error: 'Username, email, and password are required'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          error: 'Password must be at least 6 characters long'
        });
      }

      // Email validation (basic)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: 'Invalid email format'
        });
      }

      // Username validation (alphanumeric + underscore)
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(username)) {
        return res.status(400).json({
          error: 'Username must be 3-20 characters, alphanumeric and underscore only'
        });
      }

      // Create user
      const result = await AuthService.register({ username, email, password });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: result.user,
          token: result.token
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      
      if (error instanceof Error) {
        res.status(400).json({
          error: error.message
        });
      } else {
        res.status(500).json({
          error: 'Internal server error'
        });
      }
    }
  }

  // POST /auth/login
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      // Basic validation
      if (!username || !password) {
        return res.status(400).json({
          error: 'Username and password are required'
        });
      }

      // Login user
      const result = await AuthService.login({ username, password });

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: result.user,
          token: result.token
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof Error) {
        res.status(401).json({
          error: error.message
        });
      } else {
        res.status(500).json({
          error: 'Internal server error'
        });
      }
    }
  }

  // GET /auth/profile (protected route)
  static async getProfile(req: Request, res: Response) {
    try {
      // req.user is set by auth middleware
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          error: 'Authentication required'
        });
      }

      // Get user profile
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          rating: true,
          wins: true,
          losses: true,
          draws: true,
          totalMatches: true,
          name: true,
          avatar: true,
          createdAt: true,
          lastActive: true
        }
      });

      if (!user) {
        return res.status(404).json({
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        data: { user }
      });

    } catch (error) {
      console.error('Profile error:', error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
}