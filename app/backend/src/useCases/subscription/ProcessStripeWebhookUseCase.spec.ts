import { ProcessStripeWebhookUseCase } from './ProcessStripeWebhookUseCase';
import { ISubscriptionRepository } from '../../repositories/ISubscriptionRepository';
import { Subscription } from '../../models/Subscription';
import Stripe from 'stripe';

describe('ProcessStripeWebhookUseCase', () => {
  let processStripeWebhookUseCase: ProcessStripeWebhookUseCase;
  let subscriptionRepositoryMock: jest.Mocked<ISubscriptionRepository>;

  const now = new Date();
  const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  beforeEach(() => {
    subscriptionRepositoryMock = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      createOrUpdate: jest.fn(),
    };

    processStripeWebhookUseCase = new ProcessStripeWebhookUseCase(subscriptionRepositoryMock);
  });

  it('should ignore irrelevant events', async () => {
    const event = {
      type: 'charge.succeeded',
      data: { object: {} }
    } as unknown as Stripe.Event;

    await processStripeWebhookUseCase.execute(event);

    expect(subscriptionRepositoryMock.findByTenantId).not.toHaveBeenCalled();
    expect(subscriptionRepositoryMock.createOrUpdate).not.toHaveBeenCalled();
  });

  it('should ignore checkout.session.completed without metadata', async () => {
    const event = {
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_123',
          subscription: 'sub_123'
        }
      }
    } as unknown as Stripe.Event;

    await processStripeWebhookUseCase.execute(event);

    expect(subscriptionRepositoryMock.findByTenantId).not.toHaveBeenCalled();
    expect(subscriptionRepositoryMock.createOrUpdate).not.toHaveBeenCalled();
  });

  it('should process checkout.session.completed with metadata', async () => {
    const event = {
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_123',
          subscription: 'sub_123',
          metadata: {
            tenant_id: 'tenant-123',
            plan_id: 'plan-basic'
          }
        }
      }
    } as unknown as Stripe.Event;

    subscriptionRepositoryMock.findByTenantId.mockResolvedValue(null);

    await processStripeWebhookUseCase.execute(event);

    expect(subscriptionRepositoryMock.findByTenantId).toHaveBeenCalledWith('tenant-123');
    expect(subscriptionRepositoryMock.createOrUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '',
        tenantId: 'tenant-123',
        planId: 'plan-basic',
        status: 'active',
        stripeSubscriptionId: 'sub_123',
      })
    );
    // Verify startsAt and endsAt are Date objects
    const callArgs = subscriptionRepositoryMock.createOrUpdate.mock.calls[0][0];
    expect(callArgs.startsAt).toBeInstanceOf(Date);
    expect(callArgs.endsAt).toBeInstanceOf(Date);
  });

  it('should process customer.subscription.updated with metadata', async () => {
    const periodStart = 1672444800; // Some unix timestamp
    const periodEnd = 1672531199; // Some unix timestamp

    const event = {
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_456',
          status: 'past_due',
          current_period_start: periodStart,
          current_period_end: periodEnd,
          metadata: {
            tenant_id: 'tenant-456',
            plan_id: 'plan-pro'
          }
        }
      }
    } as unknown as Stripe.Event;

    subscriptionRepositoryMock.findByTenantId.mockResolvedValue(null);

    await processStripeWebhookUseCase.execute(event);

    expect(subscriptionRepositoryMock.findByTenantId).toHaveBeenCalledWith('tenant-456');
    expect(subscriptionRepositoryMock.createOrUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '',
        tenantId: 'tenant-456',
        planId: 'plan-pro',
        status: 'past_due',
        stripeSubscriptionId: 'sub_456',
        startsAt: new Date(periodStart * 1000),
        endsAt: new Date(periodEnd * 1000)
      })
    );
  });

  it('should silently ignore event if idempotency check matches existing subscription', async () => {
    const periodEnd = 1672531199;

    const event = {
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_456',
          status: 'past_due',
          current_period_start: 1672444800,
          current_period_end: periodEnd,
          metadata: {
            tenant_id: 'tenant-456',
            plan_id: 'plan-pro'
          }
        }
      }
    } as unknown as Stripe.Event;
    const periodStart = 1672444800;

    const existingSubscription = new Subscription({
      id: 'sub-db-id',
      tenantId: 'tenant-456',
      planId: 'plan-pro',
      status: 'past_due',
      stripeSubscriptionId: 'sub_456',
      startsAt: new Date(periodStart * 1000),
      endsAt: new Date(periodEnd * 1000),
      createdAt: new Date(periodStart * 1000),
      updatedAt: new Date(periodStart * 1000)
    });

    subscriptionRepositoryMock.findByTenantId.mockResolvedValue(existingSubscription);

    await processStripeWebhookUseCase.execute(event);

    expect(subscriptionRepositoryMock.findByTenantId).toHaveBeenCalledWith('tenant-456');
    expect(subscriptionRepositoryMock.createOrUpdate).not.toHaveBeenCalled();
  });

  it('should update if event is different from existing subscription', async () => {
    const periodEnd = 1672531199;

    const event = {
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_456',
          status: 'active', // Changed from past_due
          current_period_start: 1672444800,
          current_period_end: periodEnd,
          metadata: {
            tenant_id: 'tenant-456',
            plan_id: 'plan-pro'
          }
        }
      }
    } as unknown as Stripe.Event;
    const periodStart = 1672444800;

    const existingSubscription = new Subscription({
      id: 'sub-db-id',
      tenantId: 'tenant-456',
      planId: 'plan-pro',
      status: 'past_due', // Different status
      stripeSubscriptionId: 'sub_456',
      startsAt: new Date(periodStart * 1000),
      endsAt: new Date(periodEnd * 1000),
      createdAt: new Date(periodStart * 1000),
      updatedAt: new Date(periodStart * 1000)
    });

    subscriptionRepositoryMock.findByTenantId.mockResolvedValue(existingSubscription);

    await processStripeWebhookUseCase.execute(event);

    expect(subscriptionRepositoryMock.findByTenantId).toHaveBeenCalledWith('tenant-456');
    expect(subscriptionRepositoryMock.createOrUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'sub-db-id',
        tenantId: 'tenant-456',
        planId: 'plan-pro',
        status: 'active',
        stripeSubscriptionId: 'sub_456',
        endsAt: new Date(periodEnd * 1000)
      })
    );
  });
});
