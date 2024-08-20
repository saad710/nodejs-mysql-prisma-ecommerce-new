import express from 'express';
import {
  addOrderItem,
  updateOrderItem,
  removeOrderItem,
} from '../controllers/orderItemController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Route to add an item to an order (requires authentication)
router.post('/', verifyToken, addOrderItem);

// Route to update an order item (requires authentication)
router.put('/:orderItemId', verifyToken, updateOrderItem);

// Route to remove an order item (requires authentication)
router.delete('/:orderItemId', verifyToken, removeOrderItem);

export default router;
