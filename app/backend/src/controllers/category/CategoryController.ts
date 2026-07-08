import { Request, Response } from 'express';
import { CreateCategoryUseCase } from '../../useCases/category/CreateCategoryUseCase';
import { UpdateCategoryUseCase } from '../../useCases/category/UpdateCategoryUseCase';
import { DeleteCategoryUseCase } from '../../useCases/category/DeleteCategoryUseCase';
import { ListStoreCategoriesUseCase } from '../../useCases/category/ListStoreCategoriesUseCase';
import { SupabaseCategoryRepository } from '../../repositories/supabase/SupabaseCategoryRepository';
import { SupabaseStoreRepository } from '../../repositories/supabase/SupabaseStoreRepository';
import { SupabaseProductRepository } from '../../repositories/supabase/SupabaseProductRepository';

export class CategoryController {
  private createCategoryUseCase: CreateCategoryUseCase;
  private updateCategoryUseCase: UpdateCategoryUseCase;
  private deleteCategoryUseCase: DeleteCategoryUseCase;
  private listStoreCategoriesUseCase: ListStoreCategoriesUseCase;

  constructor() {
    const categoryRepo = new SupabaseCategoryRepository();
    const storeRepo = new SupabaseStoreRepository();
    const productRepo = new SupabaseProductRepository();
    
    this.createCategoryUseCase = new CreateCategoryUseCase(categoryRepo, storeRepo);
    this.updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepo);
    this.deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepo, productRepo);
    this.listStoreCategoriesUseCase = new ListStoreCategoriesUseCase(categoryRepo, storeRepo);
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user?.id;
      if (!tenantId) return res.status(401).json({ error: 'Unauthorized' });

      const category = await this.createCategoryUseCase.execute({ ...req.body, tenantId });
      return res.status(201).json(category);
    } catch (error: any) {
      if (error.message.includes('Forbidden')) return res.status(403).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user?.id;
      const { id } = req.params;
      if (!tenantId) return res.status(401).json({ error: 'Unauthorized' });

      const category = await this.updateCategoryUseCase.execute(id as string, tenantId, req.body);
      return res.status(200).json(category);
    } catch (error: any) {
      if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user?.id;
      const { id } = req.params;
      if (!tenantId) return res.status(401).json({ error: 'Unauthorized' });

      await this.deleteCategoryUseCase.execute(id as string, tenantId);
      return res.status(204).send();
    } catch (error: any) {
      if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
      if (error.message.includes('Conflict')) return res.status(409).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  listByStore = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { storeId } = req.params;
      const categories = await this.listStoreCategoriesUseCase.execute(storeId as string);
      return res.status(200).json(categories);
    } catch (error: any) {
      if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };
}
