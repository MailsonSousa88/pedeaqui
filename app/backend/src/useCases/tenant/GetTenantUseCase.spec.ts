import { GetTenantUseCase } from './GetTenantUseCase';
import { ITenantRepository } from '../../repositories/ITenantRepository';
import { TenantDetailsDTO } from '../../dtos/TenantDetailsDTO';

describe('GetTenantUseCase', () => {
  let getTenantUseCase: GetTenantUseCase;
  let tenantRepositoryMock: jest.Mocked<ITenantRepository>;

  beforeEach(() => {
    tenantRepositoryMock = {
      findById: jest.fn(),
      getDetails: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
    getTenantUseCase = new GetTenantUseCase(tenantRepositoryMock);
  });

  it('should return tenant details if tenant exists', async () => {
    const tenantId = 'tenant-123';
    const mockDetails: TenantDetailsDTO = {
      tenantId,
      status: 'active',
      businessDocument: '12.345.678/0001-99',
      profileDocument: '123.456.789-00',
      billingDocument: null,
      photoStorageLimit: 100,
      stripeCustomerId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tenantRepositoryMock.getDetails.mockResolvedValue(mockDetails);

    const result = await getTenantUseCase.execute(tenantId);

    expect(tenantRepositoryMock.getDetails).toHaveBeenCalledWith(tenantId);
    expect(result).toEqual(mockDetails);
  });

  it('should throw an error if tenant is not found', async () => {
    const tenantId = 'non-existent';
    tenantRepositoryMock.getDetails.mockResolvedValue(null);

    await expect(getTenantUseCase.execute(tenantId)).rejects.toThrow('Tenant not found');
    expect(tenantRepositoryMock.getDetails).toHaveBeenCalledWith(tenantId);
  });
});
