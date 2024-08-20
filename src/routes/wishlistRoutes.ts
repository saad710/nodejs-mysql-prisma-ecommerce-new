import express from 'express';
import {
  addItemToWishlist,
  getUserWishlist,
  removeItemFromWishlist,
} from '../controllers/wishlistController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Route to add an item to the wishlist (requires authentication)
router.post('/', verifyToken, addItemToWishlist);

// Route to get user's wishlist (requires authentication)
router.get('/', verifyToken, getUserWishlist);

// Route to remove an item from the wishlist (requires authentication)
router.delete('/:wishlistItemId', verifyToken, removeItemFromWishlist);

export default router;
