import { Favorite, CreateFavoriteRequest, UpdateFavoriteRequest, FavoriteType } from '../model/favorite';

class FavoritesService {
  private favorites: Map<string, Favorite> = new Map();

  // Create a new favorite
  createFavorite(userId: string, favoriteData: CreateFavoriteRequest): { success: boolean; message: string; favorite?: Favorite } {
    const { name, type, url } = favoriteData;

    // Validate favorite type
    if (!this.isValidFavoriteType(type)) {
      return {
        success: false,
        message: 'Invalid favorite type. Must be book, character, or house'
      };
    }

    // Check if user already has this favorite (same name and type)
    const existingFavorite = Array.from(this.favorites.values()).find(
      fav => fav.userId === userId && fav.name.toLowerCase() === name.toLowerCase() && fav.type === type
    );

    if (existingFavorite) {
      return {
        success: false,
        message: `You already have a ${type} named "${name}" in your favorites`
      };
    }

    // Create new favorite
    const newFavorite: Favorite = {
      id: this.generateId(),
      userId,
      name: name.trim(),
      type,
      url: url.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store favorite
    this.favorites.set(newFavorite.id, newFavorite);

    return {
      success: true,
      message: 'Favorite added successfully',
      favorite: newFavorite
    };
  }

  // Get all favorites for a user
  getUserFavorites(userId: string, type?: FavoriteType): Favorite[] {
    const userFavorites = Array.from(this.favorites.values()).filter(
      fav => fav.userId === userId
    );

    if (type) {
      return userFavorites.filter(fav => fav.type === type);
    }

    return userFavorites.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Get a specific favorite by ID (only if it belongs to the user)
  getFavoriteById(favoriteId: string, userId: string): Favorite | null {
    const favorite = this.favorites.get(favoriteId);
    
    if (!favorite || favorite.userId !== userId) {
      return null;
    }

    return favorite;
  }

  // Update a favorite
  updateFavorite(favoriteId: string, userId: string, updateData: UpdateFavoriteRequest): { success: boolean; message: string; favorite?: Favorite } {
    const favorite = this.getFavoriteById(favoriteId, userId);

    if (!favorite) {
      return {
        success: false,
        message: 'Favorite not found or you do not have permission to update it'
      };
    }

    // Validate type if provided
    if (updateData.type && !this.isValidFavoriteType(updateData.type)) {
      return {
        success: false,
        message: 'Invalid favorite type. Must be book, character, or house'
      };
    }

    // Check for duplicate if name or type is being changed
    if (updateData.name || updateData.type) {
      const newName = updateData.name?.trim() || favorite.name;
      const newType = updateData.type || favorite.type;

      const existingFavorite = Array.from(this.favorites.values()).find(
        fav => fav.userId === userId && 
               fav.id !== favoriteId && 
               fav.name.toLowerCase() === newName.toLowerCase() && 
               fav.type === newType
      );

      if (existingFavorite) {
        return {
          success: false,
          message: `You already have a ${newType} named "${newName}" in your favorites`
        };
      }
    }

    // Update favorite
    const updatedFavorite: Favorite = {
      ...favorite,
      name: updateData.name?.trim() || favorite.name,
      type: updateData.type || favorite.type,
      url: updateData.url?.trim() || favorite.url,
      updatedAt: new Date()
    };

    this.favorites.set(favoriteId, updatedFavorite);

    return {
      success: true,
      message: 'Favorite updated successfully',
      favorite: updatedFavorite
    };
  }

  // Delete a favorite
  deleteFavorite(favoriteId: string, userId: string): { success: boolean; message: string } {
    const favorite = this.getFavoriteById(favoriteId, userId);

    if (!favorite) {
      return {
        success: false,
        message: 'Favorite not found or you do not have permission to delete it'
      };
    }

    this.favorites.delete(favoriteId);

    return {
      success: true,
      message: 'Favorite deleted successfully'
    };
  }

  // Get favorites count by type for a user
  getFavoritesStats(userId: string): { total: number; books: number; characters: number; houses: number } {
    const userFavorites = this.getUserFavorites(userId);

    return {
      total: userFavorites.length,
      books: userFavorites.filter(fav => fav.type === 'book').length,
      characters: userFavorites.filter(fav => fav.type === 'character').length,
      houses: userFavorites.filter(fav => fav.type === 'house').length
    };
  }

  // Helper methods
  private isValidFavoriteType(type: string): type is FavoriteType {
    return ['book', 'character', 'house'].includes(type);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // For testing/debugging - get all favorites (admin only)
  getAllFavorites(): Favorite[] {
    return Array.from(this.favorites.values());
  }
}

export const favoritesService = new FavoritesService();
