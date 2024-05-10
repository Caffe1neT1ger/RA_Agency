import { Router } from 'express';
import { body } from 'express-validator';

import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/login', body('email').isEmail(), userController.login);
router.get('/refresh', authMiddleware, userController.refresh);
router.get('/hash', userController.checkHash);

export default router;
