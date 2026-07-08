import { Router } from 'express';
import { SubscriptionController } from '../controllers/SubscriptionController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const subscriptionController = new SubscriptionController();

router.post('/checkout', authMiddleware, subscriptionController.checkout);

export default router;
