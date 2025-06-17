export type FavoriteType = 'book' | 'character' | 'house';

export interface Favorite {
  id: string;
  userId: string; // Links to the user who owns this favorite
  name: string;
  type: FavoriteType;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFavoriteRequest {
  name: string;
  type: FavoriteType;
  url: string;
}

export interface UpdateFavoriteRequest {
  name?: string;
  type?: FavoriteType;
  url?: string;
}

export interface FavoriteResponse {
  success: boolean;
  message: string;
  favorite?: Favorite;
  favorites?: Favorite[];
}
