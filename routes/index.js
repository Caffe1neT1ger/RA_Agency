import { Router } from 'express';

import userRoutes from './userRoutes.js';
import estateRoutes from './estateRoutes.js';
import ownerRoutes from './ownerRoutes.js';
import statementRoutes from './statementRoutes.js';

const router = new Router();

router.use('/estate', estateRoutes);
router.use('/user', userRoutes);
router.use('/owner', ownerRoutes);
router.use('/statement', statementRoutes);

export default router;
