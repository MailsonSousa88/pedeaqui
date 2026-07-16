import { ITenantRepository } from '../../repositories/ITenantRepository';
import { IProfileRepository } from '../../repositories/IProfileRepository';
import { ISubscriptionRepository } from '../../repositories/ISubscriptionRepository';
import { Tenant } from '../../models/Tenant';
import { Subscription } from '../../models/Subscription';
import { isValidCPF, sanitizeCPF } from '../../utils/cpfValidator';
import { isValidCNPJ, sanitizeCNPJ } from '../../utils/cnpjValidator';
import * as crypto from 'crypto';

export interface RegisterTenantRequest {
  profileId: string;
  document: string;
}

export interface RegisterTenantResult {
  tenant: Tenant;
  trialSubscription: Subscription;
}

export class RegisterTenantUseCase {
  constructor(
    private tenantRepository: ITenantRepository,
    private profileRepository: IProfileRepository,
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute(request: RegisterTenantRequest): Promise<RegisterTenantResult> {
    const { profileId, document } = request;

    const isCPF = isValidCPF(document);
    const isCNPJ = isValidCNPJ(document);

    if (!isCPF && !isCNPJ) {
      throw new Error('Invalid document');
    }

    const existingTenant = await this.tenantRepository.findById(profileId);
    if (existingTenant) {
      throw new Error('Tenant already exists');
    }

    const profile = await this.profileRepository.findById(profileId);
    if (!profile) {
      throw new Error('Profile not found');
    }

    if (isCPF) {
      const sanitizedCPF = sanitizeCPF(document);
      if (profile.document !== sanitizedCPF) {
        profile.document = sanitizedCPF;
        await this.profileRepository.update(profile);
      }
    }

    const businessDocument = isCNPJ ? sanitizeCNPJ(document) : null;

    const tenant = new Tenant({
      id: profileId,
      status: 'active',
      businessDocument,
      photoStorageLimit: 524288000,
      stripeCustomerId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdTenant = await this.tenantRepository.create(tenant);

    // Cria subscription de trial: 30 dias sem plan_id (desbloqueado ao escolher plano)
    const now = new Date();
    const trialEndsAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const trialSubscription = new Subscription({
      id: crypto.randomUUID(),
      tenantId: profileId,
      planId: null,
      status: 'active',
      startsAt: now,
      endsAt: trialEndsAt,
      createdAt: now,
      updatedAt: now,
    });

    const createdSubscription = await this.subscriptionRepository.createOrUpdate(trialSubscription);

    return { tenant: createdTenant, trialSubscription: createdSubscription };
  }
}
