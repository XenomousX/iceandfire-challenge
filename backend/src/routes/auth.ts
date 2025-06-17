import { Router } from 'express';
import { authController } from '../controller/auth';
import { authenticateToken } from '../util/auth.middleware';

const router = Router();

// Public routes
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

// Protected routes
router.get('/profile', authenticateToken, authController.getProfile.bind(authController));

export default router;
