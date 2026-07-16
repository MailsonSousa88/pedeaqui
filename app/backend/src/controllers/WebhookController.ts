import { Request, Response } from 'express';
import { StripeProvider } from '../infra/providers/implementations/StripeProvider';
import { SupabaseSubscriptionRepository } from '../repositories/supabase/SupabaseSubscriptionRepository';
import { ProcessStripeWebhookUseCase } from '../useCases/subscription/ProcessStripeWebhookUseCase';

export class WebhookController {
  private stripeProvider = new StripeProvider();
  private subscriptionRepository = new SupabaseSubscriptionRepository();
  private processStripeWebhookUseCase = new ProcessStripeWebhookUseCase(this.subscriptionRepository);

  handleStripeWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
      const signature = req.headers['stripe-signature'];
      
      if (!signature) {
        res.status(400).json({ error: 'Missing stripe-signature header' });
        return;
      }

      // express.raw() parses the body as a Buffer, which is required by Stripe
      const event = this.stripeProvider.constructWebhookEvent(
        req.body,
        signature as string
      );

      await this.processStripeWebhookUseCase.execute(event);
      
      res.status(200).json({ received: true });
    } catch (error: any) {
      console.error('Stripe webhook error:', error);
      res.status(400).json({ error: `Webhook Error: ${error.message}` });
    }
  };
}
