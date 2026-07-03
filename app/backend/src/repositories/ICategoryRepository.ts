import { Category } from '../models/Category';

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>;
  findByStoreId(storeId: string): Promise<Category[]>;
  countActiveByStoreId(storeId: string): Promise<number>;
  findByTenantId(tenantId: string): Promise<Category[]>;
  create(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  softDelete(id: string): Promise<void>;
}
