import { UpdateProductUseCase } from '../UpdateProductUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';
import { Product } from '../../../models/Product';
import { Category } from '../../../models/Category';

describe('UpdateProductUseCase', () => {
  let updateProductUseCase: UpdateProductUseCase;
  let mockProductRepo: jest.Mocked<IProductRepository>;
  let mockCategoryRepo: jest.Mocked<ICategoryRepository>;

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
    updateProductUseCase = new UpdateProductUseCase(mockProductRepo, mockCategoryRepo);
  });

  it('should update successfully', async () => {
    const existing = new Product({
      id: 'prod-1', storeId: 'store-1', tenantId: 'tenant-1', categoryId: 'cat-1', name: 'A', description: null, priceCents: 1000, promoPriceCents: null, promoEndsAt: null, details: {}, available: true, deletedAt: null, createdAt: new Date(), updatedAt: new Date()
    });
    mockProductRepo.findById.mockResolvedValue(existing);
    mockProductRepo.update.mockImplementation(async (p) => p);

    const result = await updateProductUseCase.execute('prod-1', 'tenant-1', { name: 'B', priceCents: 2000 });
    
    expect(result.name).toBe('B');
    expect(result.priceCents).toBe(2000);
  });

  it('should validate promo price rules', async () => {
    const existing = new Product({
      id: 'prod-1', storeId: 'store-1', tenantId: 'tenant-1', categoryId: 'cat-1', name: 'A', description: null, priceCents: 1000, promoPriceCents: null, promoEndsAt: null, details: {}, available: true, deletedAt: null, createdAt: new Date(), updatedAt: new Date()
    });
    mockProductRepo.findById.mockResolvedValue(existing);

    // Promo maior que base
    await expect(updateProductUseCase.execute('prod-1', 'tenant-1', { promoPriceCents: 1500 }))
      .rejects.toThrow('less than base');
  });

  it('should reject a nonpositive promo price', async () => {
    const existing = new Product({
      id: 'prod-1', storeId: 'store-1', tenantId: 'tenant-1', categoryId: 'cat-1', name: 'A', description: null, priceCents: 1000, promoPriceCents: null, promoEndsAt: null, details: {}, available: true, deletedAt: null, createdAt: new Date(), updatedAt: new Date()
    });
    mockProductRepo.findById.mockResolvedValue(existing);

    await expect(updateProductUseCase.execute('prod-1', 'tenant-1', { promoPriceCents: 0 }))
      .rejects.toThrow('Promo price cents must be greater than 0');
  });

  it('should throw if changing to invalid category', async () => {
    const existing = new Product({
      id: 'prod-1', storeId: 'store-1', tenantId: 'tenant-1', categoryId: 'cat-1', name: 'A', description: null, priceCents: 1000, promoPriceCents: null, promoEndsAt: null, details: {}, available: true, deletedAt: null, createdAt: new Date(), updatedAt: new Date()
    });
    mockProductRepo.findById.mockResolvedValue(existing);
    mockCategoryRepo.findById.mockResolvedValue(null);

    await expect(updateProductUseCase.execute('prod-1', 'tenant-1', { categoryId: 'cat-2' }))
      .rejects.toThrow('Conflict: Cannot move product to an invalid or deleted category');
  });

  it('should move the product to an active category from the same store', async () => {
    const existing = new Product({
      id: 'prod-1', storeId: 'store-1', tenantId: 'tenant-1', categoryId: 'cat-1', name: 'A', description: null, priceCents: 1000, promoPriceCents: null, promoEndsAt: null, details: {}, available: true, deletedAt: null, createdAt: new Date(), updatedAt: new Date()
    });
    const newCategory = new Category({
      id: 'cat-2', storeId: 'store-1', tenantId: 'tenant-1', name: 'Nova categoria', description: null, sortOrder: 1, deletedAt: null, createdAt: new Date(), updatedAt: new Date()
    });
    mockProductRepo.findById.mockResolvedValue(existing);
    mockCategoryRepo.findById.mockResolvedValue(newCategory);
    mockProductRepo.update.mockImplementation(async (product) => product);

    const result = await updateProductUseCase.execute('prod-1', 'tenant-1', { categoryId: 'cat-2' });

    expect(result.categoryId).toBe('cat-2');
  });

  it('should throw if promo ends at is set without promo price', async () => {
    const existing = new Product({
      id: 'prod-1', storeId: 'store-1', tenantId: 'tenant-1', categoryId: 'cat-1', name: 'A', description: null, priceCents: 1000, promoPriceCents: null, promoEndsAt: null, details: {}, available: true, deletedAt: null, createdAt: new Date(), updatedAt: new Date()
    });
    mockProductRepo.findById.mockResolvedValue(existing);

    await expect(updateProductUseCase.execute('prod-1', 'tenant-1', { promoEndsAt: '2026-12-31' }))
      .rejects.toThrow('Promo ends at requires promo price cents to be defined');
  });

  it('should clear the description when an empty description is provided', async () => {
    const existing = new Product({
      id: 'prod-1', storeId: 'store-1', tenantId: 'tenant-1', categoryId: 'cat-1', name: 'A', description: 'Descrição atual', priceCents: 1000, promoPriceCents: null, promoEndsAt: null, details: {}, available: true, deletedAt: null, createdAt: new Date(), updatedAt: new Date()
    });
    mockProductRepo.findById.mockResolvedValue(existing);
    mockProductRepo.update.mockImplementation(async (product) => product);

    const result = await updateProductUseCase.execute('prod-1', 'tenant-1', { description: '' });

    expect(result.description).toBeNull();
  });
});
