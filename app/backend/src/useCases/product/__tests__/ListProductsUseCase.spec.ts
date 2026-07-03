import { ListProductsUseCase } from '../ListProductsUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { IStoreRepository } from '../../../repositories/IStoreRepository';
import { Store } from '../../../models/Store';

describe('ListProductsUseCase', () => {
  let listProductsUseCase: ListProductsUseCase;
  let mockProductRepo: jest.Mocked<IProductRepository>;
  let mockStoreRepo: jest.Mocked<IStoreRepository>;

  beforeEach(() => {
    mockProductRepo = {
      findById: jest.fn(),
      findByStoreId: jest.fn(),
      countActiveByCategoryId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      toggleAvailability: jest.fn(),
      softDelete: jest.fn(),
    };
    mockStoreRepo = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      findBySlug: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
    listProductsUseCase = new ListProductsUseCase(mockProductRepo, mockStoreRepo);
  });

  it('should list products successfully', async () => {
    mockStoreRepo.findById.mockResolvedValue({ id: 'store-1' } as Store);
    mockProductRepo.findByStoreId.mockResolvedValue([]);

    const result = await listProductsUseCase.execute('store-1');
    expect(result).toHaveLength(0);
    expect(mockProductRepo.findByStoreId).toHaveBeenCalledWith('store-1');
  });

  it('should throw if store not found', async () => {
    mockStoreRepo.findById.mockResolvedValue(null);

    await expect(listProductsUseCase.execute('store-1')).rejects.toThrow('Not Found');
  });
});
