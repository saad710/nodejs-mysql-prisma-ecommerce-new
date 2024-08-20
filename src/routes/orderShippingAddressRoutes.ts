import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { getOrderShippingAddress } from '../controllers/orderShippingAddressController';

const router = express.Router();

router.get('/:orderId', verifyToken, getOrderShippingAddress);

export default router;
