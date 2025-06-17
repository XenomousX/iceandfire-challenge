import { Request, Response } from 'express';
import { authService } from '../service/auth';
import { RegisterRequest, LoginRequest, AuthResponse } from '../model/auth';

class AuthController {
  // Register endpoint
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, email }: RegisterRequest = req.body;

      // Basic validation
      if (!username || !password || !email) {
        res.status(400).json({
          success: false,
          message: 'Username, password, and email are required'
        } as AuthResponse);
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        } as AuthResponse);
        return;
      }

      const result = await authService.register({ username, password, email });

      if (result.success) {
        res.status(201).json({
          success: true,
          message: result.message,
          user: result.user
        } as AuthResponse);
      } else {
        res.status(409).json({
          success: false,
          message: result.message
        } as AuthResponse);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      } as AuthResponse);
    }
  }

  // Login endpoint
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password }: LoginRequest = req.body;

      // Basic validation
      if (!username || !password) {
        res.status(400).json({
          success: false,
          message: 'Username and password are required'
        } as AuthResponse);
        return;
      }

      const result = await authService.login({ username, password });

      if (result.success) {
        res.status(200).json({
          success: true,
          message: result.message,
          token: result.token,
          user: result.user
        } as AuthResponse);
      } else {
        res.status(401).json({
          success: false,
          message: result.message
        } as AuthResponse);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      } as AuthResponse);
    }
  }

  // Get current user profile (protected route example)
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user; // This will be set by auth middleware
      
      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        user
      } as AuthResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      } as AuthResponse);
    }
  }
}

export const authController = new AuthController();