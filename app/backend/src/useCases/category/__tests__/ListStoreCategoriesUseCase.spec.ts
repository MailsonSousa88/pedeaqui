import { ListStoreCategoriesUseCase } from '../ListStoreCategoriesUseCase';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';
import { IStoreRepository } from '../../../repositories/IStoreRepository';
import { Store } from '../../../models/Store';
import { Category } from '../../../models/Category';

describe('ListStoreCategoriesUseCase', () => {
  let listStoreCategoriesUseCase: ListStoreCategoriesUseCase;
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

    listStoreCategoriesUseCase = new ListStoreCategoriesUseCase(mockCategoryRepository, mockStoreRepository);
  });

  it('should list categories successfully', async () => {
    mockStoreRepository.findById.mockResolvedValue({ id: 'store-1' } as Store);
    mockCategoryRepository.findByStoreId.mockResolvedValue([{ id: 'cat-1', name: 'Cat 1' } as Category]);

    const result = await listStoreCategoriesUseCase.execute('store-1');

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Cat 1');
  });

  it('should fail if store does not exist', async () => {
    mockStoreRepository.findById.mockResolvedValue(null);

    await expect(listStoreCategoriesUseCase.execute('store-1'))
      .rejects.toThrow('Not Found: Store not found');
  });
});
