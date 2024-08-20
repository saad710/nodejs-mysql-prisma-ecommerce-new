import express from 'express';
import { addItemToCart, getUserCart, updateCartItem, removeItemFromCart } from '../controllers/cartController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Route to add an item to the cart (requires authentication)
router.post('/', verifyToken, addItemToCart);

// Route to get user's cart (requires authentication)
router.get('/', verifyToken, getUserCart);

// Route to update cart item quantity (requires authentication)
router.put('/', verifyToken, updateCartItem);

// Route to remove an item from the cart (requires authentication)
router.delete('/:cartItemId', verifyToken, removeItemFromCart);

export default router;
