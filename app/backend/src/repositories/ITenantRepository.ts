import { Tenant } from '../models/Tenant';

export interface ITenantRepository {
  findById(id: string): Promise<Tenant | null>;
  create(tenant: Tenant): Promise<Tenant>;
  update(tenant: Tenant): Promise<Tenant>;
}
