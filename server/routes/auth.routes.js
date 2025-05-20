import express from 'express';
import { register, login, getProfile, updateProfile, logout } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.post('/logout', verifyToken, logout);

export default router; 