import { ITenantRepository } from '../../repositories/ITenantRepository';
import { IProfileRepository } from '../../repositories/IProfileRepository';
import { isValidCPF, sanitizeCPF } from '../../utils/cpfValidator';
import { isValidCNPJ, sanitizeCNPJ } from '../../utils/cnpjValidator';
import { Tenant } from '../../models/Tenant';

export class UpdateTenantUseCase {
  constructor(
    private tenantRepository: ITenantRepository,
    private profileRepository: IProfileRepository
  ) {}

  async execute(tenantId: string, document: string): Promise<Tenant> {
    const isCPF = isValidCPF(sanitizeCPF(document));
    const isCNPJ = isValidCNPJ(sanitizeCNPJ(document));

    if (!isCPF && !isCNPJ) {
      throw new Error('Invalid document');
    }

    const tenant = await this.tenantRepository.findById(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    if (isCPF) {
      const profile = await this.profileRepository.findById(tenantId);
      if (!profile) {
        throw new Error('Profile not found');
      }
      
      profile.document = sanitizeCPF(document);
      await this.profileRepository.update(profile);

      tenant.businessDocument = null;
      await this.tenantRepository.update(tenant);
    } else {
      tenant.businessDocument = sanitizeCNPJ(document);
      await this.tenantRepository.update(tenant);
    }

    return tenant;
  }
}
