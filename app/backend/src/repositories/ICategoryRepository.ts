import { Category } from '../models/Category';

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>;
  findByTenantId(tenantId: string): Promise<Category[]>;
  create(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
}
