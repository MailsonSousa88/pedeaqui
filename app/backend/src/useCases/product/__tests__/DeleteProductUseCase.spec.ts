import { DeleteProductUseCase } from '../DeleteProductUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { Product } from '../../../models/Product';

describe('DeleteProductUseCase', () => {
  let deleteProductUseCase: DeleteProductUseCase;
  let mockProductRepo: jest.Mocked<IProductRepository>;

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
    deleteProductUseCase = new DeleteProductUseCase(mockProductRepo);
  });

  it('should delete a product successfully', async () => {
    const existing = new Product({
      id: 'prod-1', storeId: 'store-1', tenantId: 'tenant-1', categoryId: 'cat-1', name: 'A', description: null, priceCents: 10, promoPriceCents: null, promoEndsAt: null, details: {}, available: true, deletedAt: null, createdAt: new Date(), updatedAt: new Date()
    });
    mockProductRepo.findById.mockResolvedValue(existing);

    await deleteProductUseCase.execute('prod-1', 'tenant-1');
    expect(mockProductRepo.softDelete).toHaveBeenCalledWith('prod-1');
  });

  it('should fail if product belongs to another tenant', async () => {
    const existing = new Product({
      id: 'prod-1', storeId: 'store-1', tenantId: 'tenant-999', categoryId: 'cat-1', name: 'A', description: null, priceCents: 10, promoPriceCents: null, promoEndsAt: null, details: {}, available: true, deletedAt: null, createdAt: new Date(), updatedAt: new Date()
    });
    mockProductRepo.findById.mockResolvedValue(existing);

    await expect(deleteProductUseCase.execute('prod-1', 'tenant-1'))
      .rejects.toThrow('Not Found');
  });
});
