import { Request, Response } from 'express';
import { PlansRepository } from '../../repositories/supabase/PlansRepository';
import { ListPlansUseCase } from '../../useCases/plans/ListPlansUseCase';

export class ListPlansController {
  private plansRepo = new PlansRepository();
  private listPlansUseCase = new ListPlansUseCase(this.plansRepo);

  /**
   * Admin endpoint: lists all plans with optional filter.
   * Requires authentication.
   */
  handle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { active } = req.query;
      
      let filterActive: boolean | undefined = undefined;
      if (active !== undefined) {
        filterActive = active === 'true';
      }

      const plans = await this.listPlansUseCase.execute({ active: filterActive });
      res.status(200).json(plans);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error listing plans' });
    }
  };

  /**
   * Public endpoint: lists only active plans for tenants to browse.
   * No authentication required.
   */
  handlePublic = async (_req: Request, res: Response): Promise<void> => {
    try {
      const plans = await this.listPlansUseCase.execute({ active: true });
      res.status(200).json(plans);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error listing plans' });
    }
  };
}
