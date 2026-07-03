import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { profileController } from '../controllers/ProfileController';

const router = Router();

// PATCH /api/profile/me — Atualiza dados do perfil do lojista autenticado
router.patch('/me', authMiddleware, profileController.updateMe);

export default router;
