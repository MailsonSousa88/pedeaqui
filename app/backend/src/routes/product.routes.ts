import { Router } from 'express';
import { ProductController } from '../controllers/product/ProductController';
import { ProductVariationController } from '../controllers/product/ProductVariationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const productController = new ProductController();
const productVariationController = new ProductVariationController();

// Vitrine (Public)
router.get('/store/:storeId', productController.listByStore);

// Lojista (Private)
router.use(authMiddleware);
router.post('/:productId/variations', productVariationController.createVariation);
router.get('/:productId/variations', productVariationController.listVariations);
router.put('/:productId/variations/:variationId', productVariationController.updateVariation);
router.delete('/:productId/variations/:variationId', productVariationController.deleteVariation);
router.post('/:productId/variations/:variationId/options', productVariationController.createOption);
router.get('/:productId/variations/:variationId/options', productVariationController.listOptions);
router.put('/:productId/variations/:variationId/options/:optionId', productVariationController.updateOption);
router.delete('/:productId/variations/:variationId/options/:optionId', productVariationController.deleteOption);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.patch('/:id/toggle-availability', productController.toggleAvailability);

export default router;
