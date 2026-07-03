import { ITenantRepository } from '../../repositories/ITenantRepository';
import { TenantDetailsDTO } from '../../dtos/TenantDetailsDTO';

export class GetTenantUseCase {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async execute(tenantId: string): Promise<TenantDetailsDTO> {
    const tenantDetails = await this.tenantRepository.getDetails(tenantId);
    
    if (!tenantDetails) {
      throw new Error('Tenant not found');
    }
    
    return tenantDetails;
  }
}
