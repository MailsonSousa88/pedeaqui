import { CreateProductUseCase } from '../CreateProductUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';
import { IStoreRepository } from '../../../repositories/IStoreRepository';
import { Store } from '../../../models/Store';
import { Category } from '../../../models/Category';
import { Product } from '../../../models/Product';

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase;
  let mockProductRepo: jest.Mocked<IProductRepository>;
  let mockCategoryRepo: jest.Mocked<ICategoryRepository>;
  let mockStoreRepo: jest.Mocked<IStoreRepository>;

  beforeEach(() => {
    mockProductRepo = {
      findById: jest.fn(),
      findByStoreId: jest.fn(),
      findByCategoryId: jest.fn(),
      countActiveByCategoryId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      toggleAvailability: jest.fn(),
      softDelete: jest.fn(),
    };

    mockCategoryRepo = {
      findById: jest.fn(),
      findByStoreId: jest.fn(),
      countActiveByStoreId: jest.fn(),
      findByTenantId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    };

    mockStoreRepo = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      findBySlug: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    createProductUseCase = new CreateProductUseCase(mockProductRepo, mockCategoryRepo, mockStoreRepo);
  });

  it('should create a product successfully', async () => {
    mockStoreRepo.findById.mockResolvedValue({ tenantId: 'tenant-1' } as Store);
    mockCategoryRepo.findById.mockResolvedValue({ storeId: 'store-1', deletedAt: null } as Category);
    mockProductRepo.create.mockImplementation(async (prod) => prod);

    const result = await createProductUseCase.execute({
      tenantId: 'tenant-1',
      storeId: 'store-1',
      categoryId: 'cat-1',
      name: 'Burger',
      priceCents: 1500
    });

    expect(result.name).toBe('Burger');
    expect(result.priceCents).toBe(1500);
    expect(mockProductRepo.create).toHaveBeenCalled();
  });

  it('should throw if store belongs to another tenant', async () => {
    mockStoreRepo.findById.mockResolvedValue({ tenantId: 'tenant-999' } as Store);
    
    await expect(createProductUseCase.execute({
      tenantId: 'tenant-1', storeId: 'store-1', categoryId: 'cat-1', name: 'A', priceCents: 10
    })).rejects.toThrow('Forbidden');
  });

  it('should throw if price is negative', async () => {
    mockStoreRepo.findById.mockResolvedValue({ tenantId: 'tenant-1' } as Store);
    mockCategoryRepo.findById.mockResolvedValue({ storeId: 'store-1', deletedAt: null } as Category);
    
    await expect(createProductUseCase.execute({
      tenantId: 'tenant-1', storeId: 'store-1', categoryId: 'cat-1', name: 'A', priceCents: -100
    })).rejects.toThrow('Price cents must be greater than 0');
  });

  it('should throw if category does not exist or is deleted', async () => {
    mockStoreRepo.findById.mockResolvedValue({ tenantId: 'tenant-1' } as Store);
    mockCategoryRepo.findById.mockResolvedValue(null);
    
    await expect(createProductUseCase.execute({
      tenantId: 'tenant-1', storeId: 'store-1', categoryId: 'cat-invalid', name: 'A', priceCents: 100
    })).rejects.toThrow('Conflict: Category does not exist');
  });
});
