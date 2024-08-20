import express from 'express';
import passport from 'passport';
import { register, login, socialLoginCallback } from '../controllers/authController';

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Social Login routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: true }), socialLoginCallback);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: true }), socialLoginCallback);

export default router;

