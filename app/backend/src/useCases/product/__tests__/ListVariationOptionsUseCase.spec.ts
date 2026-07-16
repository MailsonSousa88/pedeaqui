import { ListVariationOptionsUseCase } from '../ListVariationOptionsUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../../repositories/IProductVariationRepository';
import { IVariationOptionRepository } from '../../../repositories/IVariationOptionRepository';
import { Product } from '../../../models/Product';
import { ProductVariation } from '../../../models/ProductVariation';
import { VariationOption } from '../../../models/VariationOption';

describe('ListVariationOptionsUseCase', () => {
  let useCase: ListVariationOptionsUseCase;
  let mockProductRepo: jest.Mocked<IProductRepository>;
  let mockVariationRepo: jest.Mocked<IProductVariationRepository>;
  let mockOptionRepo: jest.Mocked<IVariationOptionRepository>;

  beforeEach(() => {
    mockProductRepo = productRepo();
    mockVariationRepo = variationRepo();
    mockOptionRepo = optionRepo();
    useCase = new ListVariationOptionsUseCase(mockProductRepo, mockVariationRepo, mockOptionRepo);
  });

  it('should list options for the variation', async () => {
    const options = [option()];
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());
    mockOptionRepo.findByVariationId.mockResolvedValue(options);

    const result = await useCase.execute('prod-1', 'var-1', 'tenant-1');

    expect(result).toBe(options);
    expect(mockOptionRepo.findByVariationId).toHaveBeenCalledWith('var-1');
  });

  it('should reject variation from another product', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation({ productId: 'prod-2' }));

    await expect(useCase.execute('prod-1', 'var-1', 'tenant-1')).rejects.toThrow('Not Found');
    expect(mockOptionRepo.findByVariationId).not.toHaveBeenCalled();
  });

  it('should reject missing product before listing options', async () => {
    mockProductRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute('prod-1', 'var-1', 'tenant-1')).rejects.toThrow('Not Found');
    expect(mockVariationRepo.findById).not.toHaveBeenCalled();
  });

  it('should reject missing variation before listing options', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute('prod-1', 'var-1', 'tenant-1')).rejects.toThrow('Not Found');
  });
});

function productRepo(): jest.Mocked<IProductRepository> {
  return { findById: jest.fn(), findByStoreId: jest.fn(), findByCategoryId: jest.fn(), countActiveByCategoryId: jest.fn(), create: jest.fn(), update: jest.fn(), toggleAvailability: jest.fn(), softDelete: jest.fn() };
}

function variationRepo(): jest.Mocked<IProductVariationRepository> {
  return { findById: jest.fn(), findByProductId: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() };
}

function optionRepo(): jest.Mocked<IVariationOptionRepository> {
  return { findById: jest.fn(), findByVariationId: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() };
}

function product(): Product {
  return new Product({ id: 'prod-1', storeId: 'store-1', tenantId: 'tenant-1', categoryId: 'cat-1', name: 'Pizza', description: null, priceCents: 1000, promoPriceCents: null, promoEndsAt: null, details: {}, available: true, deletedAt: null, createdAt: new Date(), updatedAt: new Date() });
}

function variation(overrides: Partial<ProductVariation> = {}): ProductVariation {
  return new ProductVariation({ id: 'var-1', productId: 'prod-1', label: 'Tamanho', sortOrder: 0, createdAt: new Date(), ...overrides });
}

function option(): VariationOption {
  return new VariationOption({ id: 'opt-1', variationId: 'var-1', value: 'Grande', priceModifierCents: 500, sortOrder: 0, createdAt: new Date() });
}
