import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/authService';

// Extend Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        email: string;
      };
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    username: string;
    email: string;
  };
}

// Authentication middleware
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        error: 'Access token required'
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        error: 'Access token malformed'
      });
    }

    // Verify token
    const decoded = AuthService.verifyToken(token);
    
    // Add user info to request object
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email
    };

    // Continue to next middleware/route
    next();

  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error instanceof Error) {
      // Handle specific JWT errors
      if (error.message.includes('expired')) {
        return res.status(401).json({
          error: 'Token expired'
        });
      }
      
      if (error.message.includes('invalid')) {
        return res.status(401).json({
          error: 'Invalid token'
        });
      }
    }

    return res.status(401).json({
      error: 'Authentication failed'
    });
  }
};

// Optional authentication middleware (for routes that work with or without auth)
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      // No token provided, but that's OK for optional auth
      return next();
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      // Malformed header, but optional so continue
      return next();
    }

    // Try to verify token
    const decoded = AuthService.verifyToken(token);
    
    // Add user info to request if token is valid
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email
    };

    next();

  } catch (error) {
    // Token verification failed, but this is optional auth
    // So we continue without setting req.user
    next();
  }
};