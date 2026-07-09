import { CreateVariationOptionUseCase } from '../CreateVariationOptionUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../../repositories/IProductVariationRepository';
import { IVariationOptionRepository } from '../../../repositories/IVariationOptionRepository';
import { Product } from '../../../models/Product';
import { ProductVariation } from '../../../models/ProductVariation';

describe('CreateVariationOptionUseCase', () => {
  let useCase: CreateVariationOptionUseCase;
  let mockProductRepo: jest.Mocked<IProductRepository>;
  let mockVariationRepo: jest.Mocked<IProductVariationRepository>;
  let mockOptionRepo: jest.Mocked<IVariationOptionRepository>;

  beforeEach(() => {
    mockProductRepo = productRepo();
    mockVariationRepo = variationRepo();
    mockOptionRepo = optionRepo();
    useCase = new CreateVariationOptionUseCase(mockProductRepo, mockVariationRepo, mockOptionRepo);
  });

  it('should create an option', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());
    mockOptionRepo.create.mockImplementation(async (option) => option);

    const result = await useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      value: 'Grande',
      priceModifierCents: 500,
      sortOrder: 1,
    });

    expect(result.value).toBe('Grande');
    expect(result.priceModifierCents).toBe(500);
    expect(result.sortOrder).toBe(1);
  });

  it('should default price modifier and sort order', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());
    mockOptionRepo.create.mockImplementation(async (option) => option);

    const result = await useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      value: 'Pequena',
    });

    expect(result.priceModifierCents).toBe(0);
    expect(result.sortOrder).toBe(0);
  });

  it('should reject invalid price modifier', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());

    await expect(useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      value: 'Grande',
      priceModifierCents: -1000000,
    })).rejects.toThrow('Price modifier cents');
  });

  it('should reject variation from another product', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation({ productId: 'prod-2' }));

    await expect(useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      value: 'Grande',
    })).rejects.toThrow('Not Found');
  });

  it('should reject missing product before creating an option', async () => {
    mockProductRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      value: 'Grande',
    })).rejects.toThrow('Not Found');

    expect(mockOptionRepo.create).not.toHaveBeenCalled();
  });

  it('should reject missing variation before creating an option', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      value: 'Grande',
    })).rejects.toThrow('Not Found');
  });
});

function productRepo(): jest.Mocked<IProductRepository> {
  return {
    findById: jest.fn(),
    findByStoreId: jest.fn(),
    findByCategoryId: jest.fn(),
    countActiveByCategoryId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    toggleAvailability: jest.fn(),
    softDelete: jest.fn(),
  };
}

function variationRepo(): jest.Mocked<IProductVariationRepository> {
  return {
    findById: jest.fn(),
    findByProductId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

function optionRepo(): jest.Mocked<IVariationOptionRepository> {
  return {
    findById: jest.fn(),
    findByVariationId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

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
