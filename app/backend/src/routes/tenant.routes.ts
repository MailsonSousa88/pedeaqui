import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { tenantController } from '../controllers/tenant/TenantController';

const router = Router();

// POST /api/tenants — Register as a Tenant
router.post('/', authMiddleware, tenantController.register);

// GET /api/tenants/me — Get current tenant details
router.get('/me', authMiddleware, tenantController.getMe);

// PATCH /api/tenants/me — Update current tenant details
router.patch('/me', authMiddleware, tenantController.update);

export default router;
