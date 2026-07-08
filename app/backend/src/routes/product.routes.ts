import { Router } from 'express';
import { ProductController } from '../controllers/product/ProductController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const productController = new ProductController();

// Vitrine (Public)
router.get('/store/:storeId', productController.listByStore);

// Lojista (Private)
router.use(authMiddleware);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.patch('/:id/toggle-availability', productController.toggleAvailability);

export default router;
