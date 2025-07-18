import { Router } from 'express';
import { AuthController } from '../auth/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes (no authentication required)
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Protected routes (authentication required)
router.get('/profile', authenticate, AuthController.getProfile);

export default router;