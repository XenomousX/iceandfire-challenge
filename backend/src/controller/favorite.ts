import { Request, Response } from 'express';
import { favoritesService } from '../service/favorite';
import { CreateFavoriteRequest, UpdateFavoriteRequest, FavoriteResponse, FavoriteType } from '../model/favorite';

export class FavoritesController {
  // Create a new favorite
  async createFavorite(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const { name, type, url }: CreateFavoriteRequest = req.body;

      // Validation
      if (!name || !type || !url) {
        res.status(400).json({
          success: false,
          message: 'Name, type, and url are required'
        } as FavoriteResponse);
        return;
      }

      if (!name.trim()) {
        res.status(400).json({
          success: false,
          message: 'Name cannot be empty'
        } as FavoriteResponse);
        return;
      }

      if (!url.trim() || !this.isValidUrl(url)) {
        res.status(400).json({
          success: false,
          message: 'Please provide a valid URL'
        } as FavoriteResponse);
        return;
      }

      const result = favoritesService.createFavorite(userId, { name, type, url });

      if (result.success) {
        res.status(201).json({
          success: true,
          message: result.message,
          favorite: result.favorite
        } as FavoriteResponse);
      } else {
        res.status(409).json({
          success: false,
          message: result.message
        } as FavoriteResponse);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      } as FavoriteResponse);
    }
  }

  // Get all favorites for the authenticated user
  async getFavorites(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const type = req.query.type as FavoriteType;

      const favorites = favoritesService.getUserFavorites(userId, type);

      res.status(200).json({
        success: true,
        message: 'Favorites retrieved successfully',
        favorites
      } as FavoriteResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      } as FavoriteResponse);
    }
  }

  // Get a specific favorite by ID
  async getFavoriteById(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const { favoriteId } = req.params;

      const favorite = favoritesService.getFavoriteById(favoriteId, userId);

      if (!favorite) {
        res.status(404).json({
          success: false,
          message: 'Favorite not found'
        } as FavoriteResponse);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Favorite retrieved successfully',
        favorite
      } as FavoriteResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      } as FavoriteResponse);
    }
  }

  // Update a favorite
  async updateFavorite(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const { favoriteId } = req.params;
      const updateData: UpdateFavoriteRequest = req.body;

      // Validate URL if provided
      if (updateData.url && !this.isValidUrl(updateData.url)) {
        res.status(400).json({
          success: false,
          message: 'Please provide a valid URL'
        } as FavoriteResponse);
        return;
      }

      // Validate name if provided
      if (updateData.name !== undefined && !updateData.name.trim()) {
        res.status(400).json({
          success: false,
          message: 'Name cannot be empty'
        } as FavoriteResponse);
        return;
      }

      const result = favoritesService.updateFavorite(favoriteId, userId, updateData);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: result.message,
          favorite: result.favorite
        } as FavoriteResponse);
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        } as FavoriteResponse);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      } as FavoriteResponse);
    }
  }

  // Delete a favorite
  async deleteFavorite(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const { favoriteId } = req.params;

      const result = favoritesService.deleteFavorite(favoriteId, userId);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: result.message
        } as FavoriteResponse);
      } else {
        res.status(404).json({
          success: false,
          message: result.message
        } as FavoriteResponse);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      } as FavoriteResponse);
    }
  }

  // Get favorites statistics
  async getFavoritesStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const stats = favoritesService.getFavoritesStats(userId);

      res.status(200).json({
        success: true,
        message: 'Statistics retrieved successfully',
        stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      } as FavoriteResponse);
    }
  }

  // Helper method to validate URL
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

export const favoritesController = new FavoritesController();
