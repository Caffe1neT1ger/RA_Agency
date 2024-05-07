import { Router } from 'express';

import ownerController from '../controllers/ownerController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), ownerController.uploadData);
router.get('/', ownerController.getData);

export default router;
