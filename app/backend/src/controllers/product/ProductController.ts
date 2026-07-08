import { Request, Response } from 'express';
import { SupabaseProductRepository } from '../../repositories/supabase/SupabaseProductRepository';
import { SupabaseCategoryRepository } from '../../repositories/supabase/SupabaseCategoryRepository';
import { SupabaseStoreRepository } from '../../repositories/supabase/SupabaseStoreRepository';
import { CreateProductUseCase } from '../../useCases/product/CreateProductUseCase';
import { UpdateProductUseCase } from '../../useCases/product/UpdateProductUseCase';
import { DeleteProductUseCase } from '../../useCases/product/DeleteProductUseCase';
import { ToggleProductAvailabilityUseCase } from '../../useCases/product/ToggleProductAvailabilityUseCase';
import { ListProductsUseCase } from '../../useCases/product/ListProductsUseCase';

export class ProductController {
  private productRepository = new SupabaseProductRepository();
  private categoryRepository = new SupabaseCategoryRepository();
  private storeRepository = new SupabaseStoreRepository();

  private createProductUseCase = new CreateProductUseCase(this.productRepository, this.categoryRepository, this.storeRepository);
  private updateProductUseCase = new UpdateProductUseCase(this.productRepository, this.categoryRepository);
  private deleteProductUseCase = new DeleteProductUseCase(this.productRepository);
  private toggleAvailabilityUseCase = new ToggleProductAvailabilityUseCase(this.productRepository);
  private listProductsUseCase = new ListProductsUseCase(this.productRepository, this.storeRepository);

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const data = { ...req.body, tenantId };

      const product = await this.createProductUseCase.execute(data);
      return res.status(201).json(product);
    } catch (error: any) {
      if (error.message.includes('Forbidden')) return res.status(403).json({ error: error.message });
      if (error.message.includes('Conflict')) return res.status(409).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const { id } = req.params;
      
      const product = await this.updateProductUseCase.execute(id as string, tenantId, req.body);
      return res.status(200).json(product);
    } catch (error: any) {
      if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
      if (error.message.includes('Conflict')) return res.status(409).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const { id } = req.params;

      await this.deleteProductUseCase.execute(id as string, tenantId);
      return res.status(204).send();
    } catch (error: any) {
      if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  toggleAvailability = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const { id } = req.params;

      const product = await this.toggleAvailabilityUseCase.execute(id as string, tenantId);
      return res.status(200).json(product);
    } catch (error: any) {
      if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  listByStore = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { storeId } = req.params;
      const products = await this.listProductsUseCase.execute(storeId as string);
      return res.status(200).json(products);
    } catch (error: any) {
      if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };
}
