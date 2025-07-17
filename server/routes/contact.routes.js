import express from 'express';
import { contactController } from '../controllers/contact.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// api/contacts/  -api endpoint
// Public routes
router.post('/add-contact', contactController.createContact);

// Protected routes
router.get('/get-contacts', verifyToken, contactController.getAllContacts);
router.get('/get-contact/:id', verifyToken, contactController.getContactById);
router.delete('/delete-contact/:id', verifyToken, contactController.deleteContact);

export default router; 