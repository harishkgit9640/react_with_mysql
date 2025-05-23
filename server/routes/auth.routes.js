import express from 'express';
import { register, login, getUserById, updateProfile, logout, getUsers, toggleStatus ,deleteUser} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/logout', verifyToken, logout);
router.get('/get-users', verifyToken, getUsers);
router.get('/get-user/:id', verifyToken, getUserById);
router.put('/update-profile/:id', verifyToken, updateProfile);
router.put('/toggle-status/:id', verifyToken, toggleStatus);
router.delete('/delete-user/:id', verifyToken, deleteUser);
export default router; 