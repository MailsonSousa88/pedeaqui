import { Router } from 'express';
import { CategoryController } from '../controllers/category/CategoryController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const categoryController = new CategoryController();

// GET /api/categories/store/:storeId — List categories by store (Público / Vitrine)
router.get('/store/:storeId', categoryController.listByStore);

// Rotas protegidas para gerência do Lojista
router.use(authMiddleware);

// POST /api/categories — Create a new category
router.post('/', categoryController.create);

// PUT /api/categories/:id — Update category
router.put('/:id', categoryController.update);

// DELETE /api/categories/:id — Soft delete category
router.delete('/:id', categoryController.delete);

export default router;
