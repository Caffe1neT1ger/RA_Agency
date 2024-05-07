import { Router } from 'express';

import estateController from '../controllers/estateController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), estateController.create);
router.get('/', estateController.getAll);
router.get('/:id', estateController.getOne);
router.delete('/', checkRoleMiddleware('ADMIN'), estateController.remove);

export default router;
