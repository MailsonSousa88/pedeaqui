import { UpdateTenantUseCase } from './UpdateTenantUseCase';
import { ITenantRepository } from '../../repositories/ITenantRepository';
import { IProfileRepository } from '../../repositories/IProfileRepository';
import { Tenant } from '../../models/Tenant';
import { Profile } from '../../models/Profile';

describe('UpdateTenantUseCase', () => {
  let updateTenantUseCase: UpdateTenantUseCase;
  let tenantRepositoryMock: jest.Mocked<ITenantRepository>;
  let profileRepositoryMock: jest.Mocked<IProfileRepository>;

  const mockTenantId = 'tenant-123';
  const validCPF = '52886531863';
  const validCNPJ = '33683111000107';

  let mockTenant: Tenant;
  let mockProfile: Profile;

  beforeEach(() => {
    tenantRepositoryMock = {
      findById: jest.fn(),
      getDetails: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    };

    profileRepositoryMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findByDocument: jest.fn(),
      update: jest.fn()
    };

    mockTenant = new Tenant({
      id: mockTenantId,
      status: 'active',
      businessDocument: null,
      photoStorageLimit: 100,
      stripeCustomerId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    mockProfile = new Profile({
      id: mockTenantId,
      name: 'Test Profile',
      phone: '123456789',
      document: undefined
    });

    tenantRepositoryMock.findById.mockResolvedValue(mockTenant);
    profileRepositoryMock.findById.mockResolvedValue(mockProfile);

    updateTenantUseCase = new UpdateTenantUseCase(tenantRepositoryMock, profileRepositoryMock);
  });

  it('should throw an error if document is invalid', async () => {
    await expect(updateTenantUseCase.execute(mockTenantId, 'invalid-doc'))
      .rejects.toThrow('Invalid document');

    expect(tenantRepositoryMock.findById).not.toHaveBeenCalled();
  });

  it('should throw an error if tenant is not found', async () => {
    tenantRepositoryMock.findById.mockResolvedValue(null);

    await expect(updateTenantUseCase.execute(mockTenantId, validCPF))
      .rejects.toThrow('Tenant not found');
  });

  it('should throw an error if profile is not found when document is CPF', async () => {
    profileRepositoryMock.findById.mockResolvedValue(null);

    await expect(updateTenantUseCase.execute(mockTenantId, validCPF))
      .rejects.toThrow('Profile not found');
  });

  it('should update profile and clear tenant businessDocument when document is CPF', async () => {
    mockTenant.businessDocument = validCNPJ;

    await updateTenantUseCase.execute(mockTenantId, validCPF);

    expect(profileRepositoryMock.findById).toHaveBeenCalledWith(mockTenantId);
    expect(mockProfile.document).toBe(validCPF);
    expect(profileRepositoryMock.update).toHaveBeenCalledWith(mockProfile);

    expect(mockTenant.businessDocument).toBeNull();
    expect(tenantRepositoryMock.update).toHaveBeenCalledWith(mockTenant);
  });

  it('should update tenant businessDocument when document is CNPJ', async () => {
    await updateTenantUseCase.execute(mockTenantId, validCNPJ);

    expect(profileRepositoryMock.findById).not.toHaveBeenCalled();

    expect(mockTenant.businessDocument).toBe(validCNPJ);
    expect(tenantRepositoryMock.update).toHaveBeenCalledWith(mockTenant);
  });
});
