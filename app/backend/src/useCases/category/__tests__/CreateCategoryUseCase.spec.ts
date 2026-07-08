import { CreateCategoryUseCase } from '../CreateCategoryUseCase';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';
import { IStoreRepository } from '../../../repositories/IStoreRepository';
import { Store } from '../../../models/Store';

describe('CreateCategoryUseCase', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let mockCategoryRepository: jest.Mocked<ICategoryRepository>;
  let mockStoreRepository: jest.Mocked<IStoreRepository>;

  beforeEach(() => {
    mockCategoryRepository = {
      findById: jest.fn(),
      findByStoreId: jest.fn(),
      countActiveByStoreId: jest.fn(),
      findByTenantId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    };

    mockStoreRepository = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      findBySlug: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    createCategoryUseCase = new CreateCategoryUseCase(mockCategoryRepository, mockStoreRepository);
  });

  it('should create a category successfully', async () => {
    mockStoreRepository.findById.mockResolvedValue({ id: 'store-1', tenantId: 'tenant-1' } as Store);
    mockCategoryRepository.create.mockImplementation(async (cat) => cat);

    const result = await createCategoryUseCase.execute({
      storeId: 'store-1',
      tenantId: 'tenant-1',
      name: 'Lanches'
    });

    expect(result.name).toBe('Lanches');
    expect(mockCategoryRepository.create).toHaveBeenCalled();
  });

  it('should fail if store does not exist', async () => {
    mockStoreRepository.findById.mockResolvedValue(null);

    await expect(createCategoryUseCase.execute({
      storeId: 'store-1',
      tenantId: 'tenant-1',
      name: 'Lanches'
    })).rejects.toThrow('Forbidden: Unauthorized to create categories for this store');
  });

  it('should fail if store belongs to another tenant', async () => {
    mockStoreRepository.findById.mockResolvedValue({ id: 'store-1', tenantId: 'tenant-999' } as Store);

    await expect(createCategoryUseCase.execute({
      storeId: 'store-1',
      tenantId: 'tenant-1',
      name: 'Lanches'
    })).rejects.toThrow('Forbidden: Unauthorized to create categories for this store');
  });
});
