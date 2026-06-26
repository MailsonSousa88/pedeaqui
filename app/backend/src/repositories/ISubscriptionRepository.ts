import { Subscription } from '../models/Subscription';

export interface ISubscriptionRepository {
  findById(id: string): Promise<Subscription | null>;
  findByTenantId(tenantId: string): Promise<Subscription | null>;
  create(subscription: Subscription): Promise<Subscription>;
  update(subscription: Subscription): Promise<Subscription>;
}
