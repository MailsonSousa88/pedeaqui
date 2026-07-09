import { Request, Response } from 'express';
import { CreateStoreUseCase } from '../../useCases/store/CreateStoreUseCase';
import { UpdateStoreUseCase } from '../../useCases/store/UpdateStoreUseCase';
import { ToggleStoreUseCase } from '../../useCases/store/ToggleStoreUseCase';
import { DeleteStoreUseCase } from '../../useCases/store/DeleteStoreUseCase';
import { GetStoreBySlugUseCase } from '../../useCases/store/GetStoreBySlugUseCase';
import { ListPublicStoresUseCase } from '../../useCases/store/ListPublicStoresUseCase';
import { SupabaseStoreRepository } from '../../repositories/supabase/SupabaseStoreRepository';
import { SupabaseSubscriptionRepository } from '../../repositories/supabase/SupabaseSubscriptionRepository';
import { SupabaseCategoryRepository } from '../../repositories/supabase/SupabaseCategoryRepository';

export class StoreController {
  private createStoreUseCase: CreateStoreUseCase;
  private updateStoreUseCase: UpdateStoreUseCase;
  private toggleStoreUseCase: ToggleStoreUseCase;
  private deleteStoreUseCase: DeleteStoreUseCase;
  private getStoreBySlugUseCase: GetStoreBySlugUseCase;
  private listPublicStoresUseCase: ListPublicStoresUseCase;

  constructor() {
    const storeRepo = new SupabaseStoreRepository();
    const subRepo = new SupabaseSubscriptionRepository();
    const categoryRepo = new SupabaseCategoryRepository();
    
    this.createStoreUseCase = new CreateStoreUseCase(storeRepo, subRepo, categoryRepo);
    this.updateStoreUseCase = new UpdateStoreUseCase(storeRepo);
    this.toggleStoreUseCase = new ToggleStoreUseCase(storeRepo);
    this.deleteStoreUseCase = new DeleteStoreUseCase(storeRepo);
    this.getStoreBySlugUseCase = new GetStoreBySlugUseCase(storeRepo);
    this.listPublicStoresUseCase = new ListPublicStoresUseCase(storeRepo);
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user?.id;
      if (!tenantId) return res.status(401).json({ error: 'Unauthorized' });

      const store = await this.createStoreUseCase.execute({ ...req.body, tenantId });
      return res.status(201).json(store);
    } catch (error: any) {
      if (error.message.includes('Forbidden')) return res.status(403).json({ error: error.message });
      if (error.message.includes('Conflict')) return res.status(409).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user?.id;
      const { id } = req.params;
      if (!tenantId) return res.status(401).json({ error: 'Unauthorized' });

      const store = await this.updateStoreUseCase.execute(id as string, tenantId, req.body);
      return res.status(200).json(store);
    } catch (error: any) {
      if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
      if (error.message.includes('Forbidden')) return res.status(403).json({ error: error.message });
      if (error.message.includes('Conflict')) return res.status(409).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  toggle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user?.id;
      const { id } = req.params;
      const { active } = req.body;
      if (!tenantId) return res.status(401).json({ error: 'Unauthorized' });

      const store = await this.toggleStoreUseCase.execute(id as string, tenantId, active);
      return res.status(200).json(store);
    } catch (error: any) {
      if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
      if (error.message.includes('Forbidden')) return res.status(403).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user?.id;
      const { id } = req.params;
      if (!tenantId) return res.status(401).json({ error: 'Unauthorized' });

      await this.deleteStoreUseCase.execute(id as string, tenantId);
      return res.status(204).send();
    } catch (error: any) {
      if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
      if (error.message.includes('Forbidden')) return res.status(403).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  getBySlug = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { slug } = req.params;
      const store = await this.getStoreBySlugUseCase.execute(slug as string);
      return res.status(200).json(store);
    } catch (error: any) {
      if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  };

  listPublic = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const stores = await this.listPublicStoresUseCase.execute();
      return res.status(200).json(stores);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
