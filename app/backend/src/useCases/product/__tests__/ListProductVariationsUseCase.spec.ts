import { ListProductVariationsUseCase } from '../ListProductVariationsUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../../repositories/IProductVariationRepository';
import { Product } from '../../../models/Product';
import { ProductVariation } from '../../../models/ProductVariation';

describe('ListProductVariationsUseCase', () => {
  let useCase: ListProductVariationsUseCase;
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
    useCase = new ListProductVariationsUseCase(mockProductRepo, mockVariationRepo);
  });

  it('should list variations for the product', async () => {
    const variations = [variation()];
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findByProductId.mockResolvedValue(variations);

    const result = await useCase.execute('prod-1', 'tenant-1');

    expect(result).toBe(variations);
    expect(mockVariationRepo.findByProductId).toHaveBeenCalledWith('prod-1');
  });

  it('should reject missing or foreign tenant product', async () => {
    mockProductRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute('prod-1', 'tenant-1')).rejects.toThrow('Not Found');
    expect(mockVariationRepo.findByProductId).not.toHaveBeenCalled();
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

function variation(): ProductVariation {
  return new ProductVariation({
    id: 'var-1',
    productId: 'prod-1',
    label: 'Tamanho',
    sortOrder: 0,
    createdAt: new Date(),
  });
}
