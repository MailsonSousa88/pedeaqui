import Stripe from 'stripe';
import { ISubscriptionRepository } from '../../repositories/ISubscriptionRepository';
import { SubscriptionStatus } from '../../models/Subscription';

export class ProcessStripeWebhookUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(event: Stripe.Event): Promise<void> {
    const relevantEvents = ['checkout.session.completed', 'customer.subscription.updated'];

    if (!relevantEvents.includes(event.type)) {
      return;
    }

    let tenantId: string | undefined;
    let planId: string | undefined;
    let stripeSubscriptionId: string | undefined;
    let status: SubscriptionStatus | undefined;
    let startsAt: Date | undefined;
    let endsAt: Date | undefined;

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      tenantId = session.metadata?.tenant_id;
      planId = session.metadata?.plan_id;
      stripeSubscriptionId = session.subscription as string;
      status = 'active';
      startsAt = new Date();
      // Default: 30 days from now for initial checkout
      endsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    } else if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      tenantId = subscription.metadata?.tenant_id;
      planId = subscription.metadata?.plan_id;
      stripeSubscriptionId = subscription.id;
      status = subscription.status as SubscriptionStatus;
      startsAt = new Date(subscription.current_period_start * 1000);
      endsAt = new Date(subscription.current_period_end * 1000);
    }

    if (!tenantId || !planId) {
      return;
    }

    const existingSubscription = await this.subscriptionRepository.findByTenantId(tenantId);

    // Idempotency check
    if (existingSubscription) {
        if (
            existingSubscription.stripeSubscriptionId === stripeSubscriptionId &&
            existingSubscription.status === status &&
            existingSubscription.planId === planId &&
            (!endsAt || existingSubscription.endsAt?.getTime() === endsAt.getTime())
        ) {
            return;
        }
    }

    const now = new Date();

    await this.subscriptionRepository.createOrUpdate({
      id: existingSubscription?.id || '',
      tenantId,
      planId,
      status,
      stripeSubscriptionId,
      startsAt: startsAt || existingSubscription?.startsAt || now,
      endsAt: endsAt || existingSubscription?.endsAt || new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      createdAt: existingSubscription?.createdAt || now,
      updatedAt: now
    });
  }
}
