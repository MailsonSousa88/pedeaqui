import { Router } from 'express';
import { CreatePlanController } from '../controllers/plans/CreatePlanController';
import { ListPlansController } from '../controllers/plans/ListPlansController';
import { UpdatePlanStatusController } from '../controllers/plans/UpdatePlanStatusController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

const createPlanController = new CreatePlanController();
const listPlansController = new ListPlansController();
const updatePlanStatusController = new UpdatePlanStatusController();

// Public route: list active plans for tenants (no auth required)
router.get('/available', listPlansController.handlePublic);

// Admin routes (auth required)
router.post('/', authMiddleware, createPlanController.handle);
router.get('/', authMiddleware, listPlansController.handle);
router.patch('/:id/status', authMiddleware, updatePlanStatusController.handle);

export default router;
