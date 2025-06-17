import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, LoginRequest, RegisterRequest } from '../model/auth';

class AuthService {
  private users: Map<string, User> = new Map();
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private readonly JWT_EXPIRES_IN = '24h';

  // Register a new user
  async register(userData: RegisterRequest): Promise<{ success: boolean; message: string; user?: Omit<User, 'password'> }> {
    const { username, password, email } = userData;

    // Check if user already exists
    const existingUser = Array.from(this.users.values()).find(
      user => user.username === username || user.email === email
    );

    if (existingUser) {
      return {
        success: false,
        message: 'User with this username or email already exists'
      };
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser: User = {
      id: this.generateId(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    // Store user in memory
    this.users.set(newUser.id, newUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      message: 'User registered successfully',
      user: userWithoutPassword
    };
  }

  // Login user
  async login(loginData: LoginRequest): Promise<{ success: boolean; message: string; token?: string; user?: Omit<User, 'password'> }> {
    const { username, password } = loginData;

    // Find user by username
    const user = Array.from(this.users.values()).find(
      user => user.username === username
    );

    if (!user) {
      return {
        success: false,
        message: 'Invalid username or password'
      };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid username or password'
      };
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username,
        email: user.email 
      },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword
    };
  }

  // Verify JWT token
  verifyToken(token: string): { valid: boolean; decoded?: any; message?: string } {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      return { valid: true, decoded };
    } catch (error) {
      return { 
        valid: false, 
        message: error instanceof Error ? error.message : 'Invalid token' 
      };
    }
  }

  // Get user by ID
  getUserById(userId: string): Omit<User, 'password'> | null {
    const user = this.users.get(userId);
    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Get all users (for testing purposes)
  getAllUsers(): Omit<User, 'password'>[] {
    return Array.from(this.users.values()).map(user => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

export const authService = new AuthService();
