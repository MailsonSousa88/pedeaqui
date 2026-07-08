import { CreateProductVariationUseCase } from '../CreateProductVariationUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../../repositories/IProductVariationRepository';
import { Product } from '../../../models/Product';

describe('CreateProductVariationUseCase', () => {
  let useCase: CreateProductVariationUseCase;
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
    useCase = new CreateProductVariationUseCase(mockProductRepo, mockVariationRepo);
  });

  it('should create a product variation with default sort order', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.create.mockImplementation(async (variation) => variation);

    const result = await useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      label: 'Tamanho',
    });

    expect(result.label).toBe('Tamanho');
    expect(result.sortOrder).toBe(0);
    expect(mockVariationRepo.create).toHaveBeenCalledTimes(1);
  });

  it('should create a product variation with explicit sort order', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.create.mockImplementation(async (variation) => variation);

    const result = await useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      label: 'Borda',
      sortOrder: 3,
    });

    expect(result.sortOrder).toBe(3);
  });

  it('should reject missing or foreign tenant product', async () => {
    mockProductRepo.findById.mockResolvedValue(product({ tenantId: 'tenant-2' }));

    await expect(useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      label: 'Tamanho',
    })).rejects.toThrow('Not Found');

    expect(mockVariationRepo.create).not.toHaveBeenCalled();
  });

  it('should reject missing product', async () => {
    mockProductRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      label: 'Tamanho',
    })).rejects.toThrow('Not Found');
  });
});

function product(overrides: Partial<Product> = {}): Product {
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
    ...overrides,
  });
}
