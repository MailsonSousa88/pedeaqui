import { DeleteProductVariationUseCase } from '../DeleteProductVariationUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../../repositories/IProductVariationRepository';
import { Product } from '../../../models/Product';
import { ProductVariation } from '../../../models/ProductVariation';

describe('DeleteProductVariationUseCase', () => {
  let useCase: DeleteProductVariationUseCase;
  let mockProductRepo: jest.Mocked<IProductRepository>;
  let mockVariationRepo: jest.Mocked<IProductVariationRepository>;

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
    mockVariationRepo = {
      findById: jest.fn(),
      findByProductId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new DeleteProductVariationUseCase(mockProductRepo, mockVariationRepo);
  });

  it('should delete a variation', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());

    await useCase.execute('prod-1', 'var-1', 'tenant-1');

    expect(mockVariationRepo.delete).toHaveBeenCalledWith('var-1');
  });

  it('should reject variation from another product', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation({ productId: 'prod-2' }));

    await expect(useCase.execute('prod-1', 'var-1', 'tenant-1')).rejects.toThrow('Not Found');
    expect(mockVariationRepo.delete).not.toHaveBeenCalled();
  });

  it('should reject missing product before looking up variation', async () => {
    mockProductRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute('prod-1', 'var-1', 'tenant-1')).rejects.toThrow('Not Found');
    expect(mockVariationRepo.findById).not.toHaveBeenCalled();
  });

  it('should reject missing variation', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute('prod-1', 'var-1', 'tenant-1')).rejects.toThrow('Not Found');
  });
});

function product(): Product {
  return new Product({
    id: 'prod-1',
    storeId: 'store-1',
    tenantId: 'tenant-1',
    categoryId: 'cat-1',
    name: 'Pizza',
    description: null,
    priceCents: 1000,
    promoPriceCents: null,
    promoEndsAt: null,
    details: {},
    available: true,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

function variation(overrides: Partial<ProductVariation> = {}): ProductVariation {
  return new ProductVariation({
    id: 'var-1',
    productId: 'prod-1',
    label: 'Tamanho',
    sortOrder: 0,
    createdAt: new Date(),
    ...overrides,
  });
}
