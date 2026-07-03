import { Request, Response } from 'express';
import { PlansRepository } from '../../repositories/supabase/PlansRepository';
import { UpdatePlanStatusUseCase } from '../../useCases/plans/UpdatePlanStatusUseCase';

export class UpdatePlanStatusController {
  private plansRepo = new PlansRepository();
  private updatePlanStatusUseCase = new UpdatePlanStatusUseCase(this.plansRepo);

  handle = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const { active } = req.body;

      if (!id) {
        res.status(400).json({ error: 'Missing plan id' });
        return;
      }

      if (active === undefined) {
        res.status(400).json({ error: 'Missing active status in body' });
        return;
      }

      const plan = await this.updatePlanStatusUseCase.execute({ id, active: Boolean(active) });
      res.status(200).json(plan);
    } catch (error: any) {
      const message = error.message || 'Error updating plan status';
      if (message === 'Plan not found') {
        res.status(404).json({ error: message });
      } else {
        res.status(400).json({ error: message });
      }
    }
  };
}
