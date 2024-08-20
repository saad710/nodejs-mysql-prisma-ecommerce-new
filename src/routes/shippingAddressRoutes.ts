import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import {
  createShippingAddress,
  getUserShippingAddresses,
  updateShippingAddress,
  deleteShippingAddress,
} from '../controllers/shippingAddressController';

const router = express.Router();

router.post('/', verifyToken, createShippingAddress);
router.get('/', verifyToken, getUserShippingAddresses);
router.put('/:id', verifyToken, updateShippingAddress);
router.delete('/:id', verifyToken, deleteShippingAddress);

export default router;
