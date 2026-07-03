import { Request, Response } from 'express';
import { PlansRepository } from '../../repositories/supabase/PlansRepository';
import { CreatePlanUseCase } from '../../useCases/plans/CreatePlanUseCase';

export class CreatePlanController {
  private plansRepo = new PlansRepository();
  private createPlanUseCase = new CreatePlanUseCase(this.plansRepo);

  handle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, priceBrlCents, stripePriceId, active } = req.body;
      
      if (!name || priceBrlCents === undefined) {
        res.status(400).json({ error: 'Missing required fields: name, priceBrlCents' });
        return;
      }

      const plan = await this.createPlanUseCase.execute({
        name,
        priceBrlCents,
        stripePriceId,
        active
      });

      res.status(201).json(plan);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error creating plan' });
    }
  };
}
