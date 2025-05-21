// server/routes/project.routes.js
import express from 'express';
import { projectController } from '../controllers/project.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';


const router = express.Router();

// Apply auth middleware to all routes
router.use(verifyToken);

// Project routes
router.get('/all-projects', projectController.getAllProjects);
router.get('/get-project/:id', projectController.getProjectById);
router.post('/create-project', projectController.createProject);
router.put('/update-project/:id', projectController.updateProject);
router.delete('/delete-project/:id', projectController.deleteProject);

export default router;