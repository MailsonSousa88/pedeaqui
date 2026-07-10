import { Router } from 'express';
import { StoreController } from '../controllers/store/StoreController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const storeController = new StoreController();

// Rotas protegidas para Lojistas
router.post('/', authMiddleware, storeController.create);
router.put('/:id', authMiddleware, storeController.update);
router.patch('/:id/toggle', authMiddleware, storeController.toggle);
router.delete('/:id', authMiddleware, storeController.delete);

// Rota pública para clientes visualizarem lojas disponíveis
router.get('/public', storeController.listPublic);

// Rota pública para clientes acessarem o cardápio da loja
router.get('/:slug', storeController.getBySlug);

export default router;
