import { RegisterTenantUseCase } from './RegisterTenantUseCase';
import { ITenantRepository } from '../../repositories/ITenantRepository';
import { IProfileRepository } from '../../repositories/IProfileRepository';
import { ISubscriptionRepository } from '../../repositories/ISubscriptionRepository';
import { Tenant } from '../../models/Tenant';
import { Profile } from '../../models/Profile';
import { Subscription } from '../../models/Subscription';

jest.mock('../../utils/cpfValidator', () => ({
  isValidCPF: jest.fn((doc) => doc.length === 11),
  sanitizeCPF: jest.fn((doc) => doc.replace(/\D/g, '')),
}));

jest.mock('../../utils/cnpjValidator', () => ({
  isValidCNPJ: jest.fn((doc) => doc.length === 14),
  sanitizeCNPJ: jest.fn((doc) => doc.replace(/\D/g, '')),
}));

describe('RegisterTenantUseCase', () => {
  let useCase: RegisterTenantUseCase;
  let tenantRepository: jest.Mocked<ITenantRepository>;
  let profileRepository: jest.Mocked<IProfileRepository>;
  let subscriptionRepository: jest.Mocked<ISubscriptionRepository>;

  const makeTrialSubscription = (tenantId: string): Subscription =>
    new Subscription({
      id: 'sub-trial-1',
      tenantId,
      planId: null,
      status: 'active',
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  beforeEach(() => {
    tenantRepository = {
      findById: jest.fn(),
      getDetails: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    profileRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByDocument: jest.fn(),
      update: jest.fn(),
    };

    subscriptionRepository = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      createOrUpdate: jest.fn(),
    };

    useCase = new RegisterTenantUseCase(tenantRepository, profileRepository, subscriptionRepository);
  });

  it('should throw an error if document is invalid', async () => {
    await expect(
      useCase.execute({ profileId: 'profile-1', document: '123' })
    ).rejects.toThrow('Invalid document');
  });

  it('should throw an error if tenant already exists', async () => {
    tenantRepository.findById.mockResolvedValue(
      new Tenant({
        id: 'profile-1',
        status: 'active',
        photoStorageLimit: 524288000,
        stripeCustomerId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    await expect(
      useCase.execute({ profileId: 'profile-1', document: '07147775086' })
    ).rejects.toThrow('Tenant already exists');
  });

  it('should throw an error if profile is not found', async () => {
    tenantRepository.findById.mockResolvedValue(null);
    profileRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({ profileId: 'profile-1', document: '07147775086' })
    ).rejects.toThrow('Profile not found');
  });

  it('should update profile, create tenant and return trial subscription when document is a valid CPF', async () => {
    tenantRepository.findById.mockResolvedValue(null);
    const profile = new Profile({ id: 'profile-1', name: 'John Doe', phone: '11999999999' });
    profileRepository.findById.mockResolvedValue(profile);
    profileRepository.update.mockResolvedValue(profile);
    tenantRepository.create.mockImplementation(async (tenant) => tenant);
    subscriptionRepository.createOrUpdate.mockImplementation(async (sub) =>
      makeTrialSubscription(sub.tenantId!)
    );

    const validCpf = '07147775086';
    const result = await useCase.execute({ profileId: 'profile-1', document: validCpf });

    expect(profileRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({ document: validCpf })
    );
    expect(tenantRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'profile-1',
        status: 'active',
        businessDocument: null,
        photoStorageLimit: 524288000,
      })
    );
    expect(result.tenant.id).toBe('profile-1');
    expect(result.trialSubscription.status).toBe('active');
    expect(result.trialSubscription.planId).toBeNull();
  });

  it('should not update profile if CPF already matches profile document', async () => {
    tenantRepository.findById.mockResolvedValue(null);
    const validCpf = '07147775086';
    const profile = new Profile({
      id: 'profile-1',
      name: 'John Doe',
      phone: '11999999999',
      document: validCpf,
    });
    profileRepository.findById.mockResolvedValue(profile);
    tenantRepository.create.mockImplementation(async (tenant) => tenant);
    subscriptionRepository.createOrUpdate.mockImplementation(async (sub) =>
      makeTrialSubscription(sub.tenantId!)
    );

    await useCase.execute({ profileId: 'profile-1', document: validCpf });

    expect(profileRepository.update).not.toHaveBeenCalled();
    expect(subscriptionRepository.createOrUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'active', planId: null })
    );
  });

  it('should create tenant with businessDocument and trial subscription when document is a valid CNPJ', async () => {
    tenantRepository.findById.mockResolvedValue(null);
    const profile = new Profile({ id: 'profile-1', name: 'John Doe', phone: '11999999999' });
    profileRepository.findById.mockResolvedValue(profile);
    tenantRepository.create.mockImplementation(async (tenant) => tenant);
    subscriptionRepository.createOrUpdate.mockImplementation(async (sub) =>
      makeTrialSubscription(sub.tenantId!)
    );

    const validCnpj = '47453000000109';
    const result = await useCase.execute({ profileId: 'profile-1', document: validCnpj });

    expect(profileRepository.update).not.toHaveBeenCalled();
    expect(tenantRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'profile-1',
        status: 'active',
        businessDocument: validCnpj,
      })
    );
    expect(result.trialSubscription.status).toBe('active');
    expect(result.trialSubscription.planId).toBeNull();
    expect(result.tenant.businessDocument).toBe(validCnpj);
  });

  it('trial subscription endsAt should be ~30 days after startsAt', async () => {
    tenantRepository.findById.mockResolvedValue(null);
    profileRepository.findById.mockResolvedValue(
      new Profile({ id: 'profile-1', name: 'John Doe', phone: '11999999999' })
    );
    tenantRepository.create.mockImplementation(async (t) => t);

    const beforeCall = Date.now();
    subscriptionRepository.createOrUpdate.mockImplementation(async (sub) => {
      const s = sub as Subscription;
      return new Subscription({
        id: crypto.randomUUID(),
        tenantId: s.tenantId,
        planId: null,
        status: 'active',
        startsAt: s.startsAt,
        endsAt: s.endsAt,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      });
    });

    const result = await useCase.execute({ profileId: 'profile-1', document: '07147775086' });

    const diffMs = result.trialSubscription.endsAt.getTime() - result.trialSubscription.startsAt.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    expect(diffDays).toBeCloseTo(30, 0);
    expect(result.trialSubscription.startsAt.getTime()).toBeGreaterThanOrEqual(beforeCall);
  });
});
