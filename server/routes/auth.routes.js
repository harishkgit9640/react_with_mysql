import express from 'express';
import { createUser, login, getUserById, updateProfile, logout, getUsers, toggleStatus, deleteUser, updateAvatar } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { upload, handleMulterError } from '../middleware/uploadAvatar.js';

const router = express.Router();

// Public routes
router.post('/create-user', createUser);
router.post('/login', login);

// Protected routes
router.post('/logout', verifyToken, logout);
router.get('/get-users', verifyToken, getUsers);
router.get('/get-user/:id', verifyToken, getUserById);
router.put('/update-profile/:id', verifyToken, updateProfile);
router.put('/update-avatar/:id', verifyToken, upload.single('profile_picture'), updateAvatar);
router.put('/toggle-status/:id', verifyToken, toggleStatus);
router.delete('/delete-user/:id', verifyToken, deleteUser);

export default router;