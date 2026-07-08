import { Subscription } from '../models/Subscription';

export interface ISubscriptionRepository {
  findById(id: string): Promise<Subscription | null>;
  findByTenantId(tenantId: string): Promise<Subscription | null>;
  createOrUpdate(subscription: Partial<Subscription>): Promise<Subscription>;
}
