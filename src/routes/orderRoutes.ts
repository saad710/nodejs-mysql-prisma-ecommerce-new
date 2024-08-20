import express from 'express';
import { createOrder, getUserOrders, getOrderById } from '../controllers/orderController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Route to create a new order (requires authentication)
router.post('/', verifyToken, createOrder);

// Route to get all orders of a user (requires authentication)
router.get('/', verifyToken, getUserOrders);

// Route to get a specific order by ID (requires authentication)
router.get('/:id', verifyToken, getOrderById);

export default router;
