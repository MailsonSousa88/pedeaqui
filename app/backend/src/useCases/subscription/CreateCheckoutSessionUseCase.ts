import { ISubscriptionRepository } from '../../repositories/ISubscriptionRepository';
import { IStripeProvider } from '../../infra/providers/IStripeProvider';

export interface ICreateCheckoutSessionRequest {
  tenantId: string;
  planId: string;
}

export class CreateCheckoutSessionUseCase {
  constructor(
    private subscriptionRepository: ISubscriptionRepository,
    private stripeProvider: IStripeProvider
  ) {}

  async execute({ tenantId, planId }: ICreateCheckoutSessionRequest): Promise<string> {
    const existingSubscription = await this.subscriptionRepository.findByTenantId(tenantId);
    
    if (existingSubscription && existingSubscription.status === 'active') {
      throw new Error('Tenant already has an active subscription');
    }

    const checkoutUrl = await this.stripeProvider.createCheckoutSession(tenantId, planId);
    return checkoutUrl;
  }
}
