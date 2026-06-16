import { Router, Response } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware, AuthenticatedRequest } from '../middlewares/authMiddleware';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/recover-password', authController.recoverPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/refresh', authController.refreshSession);

// Protected routes
router.post('/logout', authMiddleware, authController.logout);

// Protected test route for 'me'
router.get('/me', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ user: req.user });
});

export default router;
