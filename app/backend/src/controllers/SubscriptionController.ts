import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { SupabaseSubscriptionRepository } from '../repositories/supabase/SupabaseSubscriptionRepository';
import { StripeProvider } from '../infra/providers/implementations/StripeProvider';
import { CreateCheckoutSessionUseCase } from '../useCases/subscription/CreateCheckoutSessionUseCase';

export class SubscriptionController {
  private subscriptionRepository = new SupabaseSubscriptionRepository();
  private stripeProvider = new StripeProvider();
  private createCheckoutSessionUseCase = new CreateCheckoutSessionUseCase(
    this.subscriptionRepository,
    this.stripeProvider
  );

  checkout = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const tenantId = req.user?.id;
      const { planId } = req.body;

      if (!tenantId) {
        res.status(401).json({ error: 'Unauthorized: missing user id' });
        return;
      }

      if (!planId) {
        res.status(400).json({ error: 'Missing planId in request body' });
        return;
      }

      const url = await this.createCheckoutSessionUseCase.execute({ tenantId, planId });
      res.status(200).json({ url });
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Error creating checkout session' });
    }
  };
}
