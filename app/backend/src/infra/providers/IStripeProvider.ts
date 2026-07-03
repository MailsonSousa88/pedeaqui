import Stripe from 'stripe';

export interface IStripeProvider {
  createCheckoutSession(tenantId: string, planId: string): Promise<string>;
  constructWebhookEvent(rawBody: Buffer, signature: string): Stripe.Event;
}
