import { Store } from '../models/Store';

export interface IStoreRepository {
  findById(id: string): Promise<Store | null>;
  findByTenantId(tenantId: string): Promise<Store | null>;
  findBySlug(slug: string): Promise<Store | null>;
  create(store: Store): Promise<Store>;
  update(store: Store): Promise<Store>;
}
