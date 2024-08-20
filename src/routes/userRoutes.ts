import express from 'express';
import { getUserDetails } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Get User Details (Protected Route)
router.get('/', verifyToken, getUserDetails);

export default router;