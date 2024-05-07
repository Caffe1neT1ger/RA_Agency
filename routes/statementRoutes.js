import { Router } from 'express';

import statementController from '../controllers/statementController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = new Router();

router.post('/', statementController.create);
router.get('/', checkRoleMiddleware('ADMIN'), statementController.getAll);
router.get('/:id', checkRoleMiddleware('ADMIN'), statementController.getOne);
router.delete('/', checkRoleMiddleware('ADMIN'), statementController.remove);

export default router;
