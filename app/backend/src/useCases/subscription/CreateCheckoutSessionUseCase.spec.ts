import { CreateCheckoutSessionUseCase } from './CreateCheckoutSessionUseCase';
import { ISubscriptionRepository } from '../../repositories/ISubscriptionRepository';
import { IStripeProvider } from '../../infra/providers/IStripeProvider';
import { Subscription } from '../../models/Subscription';

describe('CreateCheckoutSessionUseCase', () => {
  let createCheckoutSessionUseCase: CreateCheckoutSessionUseCase;
  let subscriptionRepositoryMock: jest.Mocked<ISubscriptionRepository>;
  let stripeProviderMock: jest.Mocked<IStripeProvider>;

  const now = new Date();
  const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  beforeEach(() => {
    subscriptionRepositoryMock = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      createOrUpdate: jest.fn(),
    };

    stripeProviderMock = {
      createCheckoutSession: jest.fn(),
      constructWebhookEvent: jest.fn(),
    };

    createCheckoutSessionUseCase = new CreateCheckoutSessionUseCase(
      subscriptionRepositoryMock,
      stripeProviderMock
    );
  });

  it('should create a checkout session when there is no active subscription', async () => {
    subscriptionRepositoryMock.findByTenantId.mockResolvedValue(null);
    stripeProviderMock.createCheckoutSession.mockResolvedValue('http://checkout.url');

    const result = await createCheckoutSessionUseCase.execute({
      tenantId: 'tenant-123',
      planId: 'plan-123',
    });

    expect(result).toBe('http://checkout.url');
    expect(subscriptionRepositoryMock.findByTenantId).toHaveBeenCalledWith('tenant-123');
    expect(stripeProviderMock.createCheckoutSession).toHaveBeenCalledWith('tenant-123', 'plan-123');
  });

  it('should create a checkout session when the tenant has an active trial subscription', async () => {
    subscriptionRepositoryMock.findByTenantId.mockResolvedValue(new Subscription({
      id: 'sub-trial-123',
      tenantId: 'tenant-123',
      planId: null,
      status: 'active',
      startsAt: now,
      endsAt: thirtyDaysLater,
      createdAt: now,
      updatedAt: now
    }));
    stripeProviderMock.createCheckoutSession.mockResolvedValue('http://checkout.url');

    const result = await createCheckoutSessionUseCase.execute({
      tenantId: 'tenant-123',
      planId: 'plan-123',
    });

    expect(result).toBe('http://checkout.url');
    expect(subscriptionRepositoryMock.findByTenantId).toHaveBeenCalledWith('tenant-123');
    expect(stripeProviderMock.createCheckoutSession).toHaveBeenCalledWith('tenant-123', 'plan-123');
  });

  it('should throw an error if the tenant already has an active paid subscription', async () => {
    subscriptionRepositoryMock.findByTenantId.mockResolvedValue(new Subscription({
      id: 'sub-123',
      tenantId: 'tenant-123',
      planId: 'plan-123',
      status: 'active',
      startsAt: now,
      endsAt: thirtyDaysLater,
      createdAt: now,
      updatedAt: now
    }));

    await expect(createCheckoutSessionUseCase.execute({
      tenantId: 'tenant-123',
      planId: 'plan-123',
    })).rejects.toThrow('Tenant already has an active subscription');

    expect(subscriptionRepositoryMock.findByTenantId).toHaveBeenCalledWith('tenant-123');
    expect(stripeProviderMock.createCheckoutSession).not.toHaveBeenCalled();
  });
  
  it('should create a checkout session if the tenant subscription is canceled', async () => {
    subscriptionRepositoryMock.findByTenantId.mockResolvedValue(new Subscription({
      id: 'sub-123',
      tenantId: 'tenant-123',
      planId: 'plan-123',
      status: 'canceled',
      startsAt: now,
      endsAt: thirtyDaysLater,
      createdAt: now,
      updatedAt: now
    }));
    stripeProviderMock.createCheckoutSession.mockResolvedValue('http://checkout.url');

    const result = await createCheckoutSessionUseCase.execute({
      tenantId: 'tenant-123',
      planId: 'plan-123',
    });

    expect(result).toBe('http://checkout.url');
  });
});
