import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { dashboard, profile } from '../controllers/protectedController.js';

const router = express.Router();

router.get('/dashboard', verifyToken, dashboard);  // Protect this route
router.get('/profile', verifyToken, profile);  // Protect this route

export default router;
