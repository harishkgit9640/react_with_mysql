import express from 'express';
import { contactController } from '../controllers/contact.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// api/contacts/  -api endpoint
// Public routes
router.post('/add-contact', contactController.createContact);

// Protected routes
router.get('/', verifyToken, contactController.getAllContacts);
router.get('/:id', verifyToken, contactController.getContactById);
router.delete('/:id', verifyToken, contactController.deleteContact);

export default router; 