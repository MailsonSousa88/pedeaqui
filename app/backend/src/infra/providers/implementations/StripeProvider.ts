import Stripe from 'stripe';
import { IStripeProvider } from '../IStripeProvider';

export class StripeProvider implements IStripeProvider {
  private stripe: Stripe;
  private webhookSecret: string;

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY || (process.env.NODE_ENV === 'test' ? 'sk_test_dummy' : undefined);
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
    }

    this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || (process.env.NODE_ENV === 'test' ? 'whsec_dummy' : '');
    if (!this.webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not defined in environment variables');
    }

    this.stripe = new Stripe(secretKey);
  }

  async createCheckoutSession(tenantId: string, planId: string): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      client_reference_id: tenantId,
      success_url: process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/success',
      cancel_url: process.env.STRIPE_CANCEL_URL || 'http://localhost:3000/cancel',
    });

    if (!session.url) {
      throw new Error('Failed to create Stripe checkout session URL');
    }

    return session.url;
  }

  constructWebhookEvent(rawBody: Buffer, signature: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      this.webhookSecret
    );
  }
}
