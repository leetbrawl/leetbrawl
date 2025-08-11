import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { prisma } from '../config/database';

// JWT configuration with proper error handling
if (!process.env.JWT_SECRET) {
  throw new Error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
}
const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  rating: number;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export class AuthService {
  // Hash password with bcrypt
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12; // Higher = more secure but slower
    return bcrypt.hash(password, saltRounds);
  }

  // Compare password with hash
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Generate JWT token
  static generateToken(user: AuthUser): string {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    
    const options: SignOptions = {
      expiresIn: '7d'
    };
    
    return jwt.sign(payload, JWT_SECRET, options) as string;
  }

  // Verify JWT token
  static verifyToken(token: string): JwtPayload & { id: string; username: string; email: string } {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload & {
        id: string; 
        username: string; 
        email: string; 
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  // Register new user
  static async register(input: RegisterInput): Promise<{ user: AuthUser; token: string }> {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: input.username },
          { email: input.email }
        ]
      }
    });

    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(input.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        username: input.username,
        email: input.email,
        password: hashedPassword,
        // rating defaults to 1200 from schema
      },
      select: {
        id: true,
        username: true,
        email: true,
        rating: true,
        // Don't return password!
      }
    });

    // Generate token
    const token = this.generateToken(user);

    return { user, token };
  }

  // Login user
  static async login(input: LoginInput): Promise<{ user: AuthUser; token: string }> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { username: input.username },
      select: {
        id: true,
        username: true,
        email: true,
        rating: true,
        password: true, // Need password for comparison
      }
    });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Check password
    const isPasswordValid = await this.comparePassword(input.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    // Update last active
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActive: new Date() }
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    // Generate token
    const token = this.generateToken(userWithoutPassword);

    return { user: userWithoutPassword, token };
  }
}