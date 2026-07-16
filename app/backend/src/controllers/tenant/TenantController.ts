import { Request, Response } from 'express';
import { RegisterTenantUseCase } from '../../useCases/tenant/RegisterTenantUseCase';
import { GetTenantUseCase } from '../../useCases/tenant/GetTenantUseCase';
import { UpdateTenantUseCase } from '../../useCases/tenant/UpdateTenantUseCase';
import { SupabaseTenantRepository } from '../../repositories/supabase/SupabaseTenantRepository';
import { SupabaseProfileRepository } from '../../repositories/supabase/SupabaseProfileRepository';
import { SupabaseSubscriptionRepository } from '../../repositories/supabase/SupabaseSubscriptionRepository';

const tenantRepository = new SupabaseTenantRepository();
const profileRepository = new SupabaseProfileRepository();
const subscriptionRepository = new SupabaseSubscriptionRepository();

const registerTenantUseCase = new RegisterTenantUseCase(tenantRepository, profileRepository, subscriptionRepository);
const getTenantUseCase = new GetTenantUseCase(tenantRepository);
const updateTenantUseCase = new UpdateTenantUseCase(tenantRepository, profileRepository);

export class TenantController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const profileId = (req as any).user?.id;
      if (!profileId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { document } = req.body;
      const { tenant } = await registerTenantUseCase.execute({ profileId, document });

      return res.status(201).json(tenant);
    } catch (error: any) {
      if (error.message === 'Invalid document' || error.message === 'Invalid document provided') {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === 'Tenant already exists') {
        return res.status(409).json({ error: error.message });
      }
      if (error.message === 'Profile not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('Error registering tenant:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getMe(req: Request, res: Response): Promise<Response> {
    try {
      const tenantId = (req as any).user?.id;
      if (!tenantId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const tenantDetails = await getTenantUseCase.execute(tenantId);
      return res.status(200).json(tenantDetails);
    } catch (error: any) {
      if (error.message === 'Tenant not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('Error fetching tenant:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const tenantId = (req as any).user?.id;
      if (!tenantId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { document } = req.body;
      if (!document) {
        return res.status(400).json({ error: 'Document is required' });
      }

      const tenant = await updateTenantUseCase.execute(tenantId, document);
      return res.status(200).json(tenant);
    } catch (error: any) {
      if (error.message === 'Invalid document' || error.message === 'Invalid document provided') {
        return res.status(400).json({ error: error.message });
      }
      if (error.message === 'Tenant not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('Error updating tenant:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const tenantController = new TenantController();
