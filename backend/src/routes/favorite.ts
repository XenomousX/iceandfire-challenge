import { Router } from 'express';
import { favoritesController } from '../controller/favorite';
import { authenticateToken } from '../util/auth.middleware'

const router = Router();

// All favorites routes require authentication
router.use(authenticateToken);

// CRUD operations
router.post('/', favoritesController.createFavorite.bind(favoritesController));
router.get('/', favoritesController.getFavorites.bind(favoritesController));
router.get('/stats', favoritesController.getFavoritesStats.bind(favoritesController));
router.get('/:favoriteId', favoritesController.getFavoriteById.bind(favoritesController));
router.put('/:favoriteId', favoritesController.updateFavorite.bind(favoritesController));
router.delete('/:favoriteId', favoritesController.deleteFavorite.bind(favoritesController));

export default router;
