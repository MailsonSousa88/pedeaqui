import { Tenant } from '../models/Tenant';
import { TenantDetailsDTO } from '../dtos/TenantDetailsDTO';

export interface ITenantRepository {
  findById(id: string): Promise<Tenant | null>;
  getDetails(id: string): Promise<TenantDetailsDTO | null>;
  create(tenant: Tenant): Promise<Tenant>;
  update(tenant: Tenant): Promise<Tenant>;
}
