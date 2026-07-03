import { ToggleProductAvailabilityUseCase } from '../ToggleProductAvailabilityUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { Product } from '../../../models/Product';

describe('ToggleProductAvailabilityUseCase', () => {
  let toggleUseCase: ToggleProductAvailabilityUseCase;
  let mockProductRepo: jest.Mocked<IProductRepository>;

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
    toggleUseCase = new ToggleProductAvailabilityUseCase(mockProductRepo);
  });

  it('should toggle availability', async () => {
    const existing = new Product({
      id: 'prod-1', storeId: 'store-1', tenantId: 'tenant-1', categoryId: 'cat-1', name: 'A', priceCents: 10, promoPriceCents: null, promoEndsAt: null, details: {}, available: true, deletedAt: null, createdAt: new Date(), updatedAt: new Date()
    });
    mockProductRepo.findById.mockResolvedValue(existing);
    
    await toggleUseCase.execute('prod-1', 'tenant-1');
    // Como inverte, tem que chamar com falso
    expect(mockProductRepo.toggleAvailability).toHaveBeenCalledWith('prod-1', false);
  });

  it('should throw if product is not found', async () => {
    mockProductRepo.findById.mockResolvedValue(null);
    await expect(toggleUseCase.execute('prod-1', 'tenant-1')).rejects.toThrow('Not Found');
  });
});
