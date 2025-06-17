import { Request, Response, NextFunction } from 'express';
import { authService } from '../service/auth';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Access token is required'
    });
    return;
  }

  const verification = authService.verifyToken(token);

  if (!verification.valid) {
    res.status(403).json({
      success: false,
      message: verification.message || 'Invalid or expired token'
    });
    return;
  }

  // Get user details and attach to request
  const user = authService.getUserById(verification.decoded.userId);
  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
    return;
  }

  (req as any).user = user;
  next();
};