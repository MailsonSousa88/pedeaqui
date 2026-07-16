import { UpdateProductVariationUseCase } from '../UpdateProductVariationUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../../repositories/IProductVariationRepository';
import { Product } from '../../../models/Product';
import { ProductVariation } from '../../../models/ProductVariation';

describe('UpdateProductVariationUseCase', () => {
  let useCase: UpdateProductVariationUseCase;
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
    useCase = new UpdateProductVariationUseCase(mockProductRepo, mockVariationRepo);
  });

  it('should update label and sort order', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());
    mockVariationRepo.update.mockImplementation(async (updated) => updated);

    const result = await useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      label: 'Sabor',
      sortOrder: 2,
    });

    expect(result.label).toBe('Sabor');
    expect(result.sortOrder).toBe(2);
  });

  it('should reject missing variation', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      label: 'Sabor',
    })).rejects.toThrow('Not Found');
  });

  it('should reject missing product', async () => {
    mockProductRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      label: 'Sabor',
    })).rejects.toThrow('Not Found');

    expect(mockVariationRepo.findById).not.toHaveBeenCalled();
  });

  it('should keep existing fields when update data is partial', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());
    mockVariationRepo.update.mockImplementation(async (updated) => updated);

    const result = await useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      sortOrder: 4,
    });

    expect(result.label).toBe('Tamanho');
    expect(result.sortOrder).toBe(4);
  });

  it('should keep sort order when only label changes', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());
    mockVariationRepo.update.mockImplementation(async (updated) => updated);

    const result = await useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      label: 'Sabor',
    });

    expect(result.label).toBe('Sabor');
    expect(result.sortOrder).toBe(0);
  });

  it('should reject variation from another product', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation({ productId: 'prod-2' }));

    await expect(useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      label: 'Sabor',
    })).rejects.toThrow('Not Found');
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
