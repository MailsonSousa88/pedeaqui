import { UpdateVariationOptionUseCase } from '../UpdateVariationOptionUseCase';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../../repositories/IProductVariationRepository';
import { IVariationOptionRepository } from '../../../repositories/IVariationOptionRepository';
import { Product } from '../../../models/Product';
import { ProductVariation } from '../../../models/ProductVariation';
import { VariationOption } from '../../../models/VariationOption';

describe('UpdateVariationOptionUseCase', () => {
  let useCase: UpdateVariationOptionUseCase;
  let mockProductRepo: jest.Mocked<IProductRepository>;
  let mockVariationRepo: jest.Mocked<IProductVariationRepository>;
  let mockOptionRepo: jest.Mocked<IVariationOptionRepository>;

  beforeEach(() => {
    mockProductRepo = productRepo();
    mockVariationRepo = variationRepo();
    mockOptionRepo = optionRepo();
    useCase = new UpdateVariationOptionUseCase(mockProductRepo, mockVariationRepo, mockOptionRepo);
  });

  it('should update value, price modifier and sort order', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());
    mockOptionRepo.findById.mockResolvedValue(option());
    mockOptionRepo.update.mockImplementation(async (updated) => updated);

    const result = await useCase.execute({
      tenantId: 'tenant-1',
      productId: 'prod-1',
      variationId: 'var-1',
      optionId: 'opt-1',
      value: 'Grande 35cm',
      priceModifierCents: 700,
      sortOrder: 2,
    });

    expect(result.value).toBe('Grande 35cm');
    expect(result.priceModifierCents).toBe(700);
    expect(result.sortOrder).toBe(2);
  });

  it('should reject missing option', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());
    mockOptionRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute({ tenantId: 'tenant-1', productId: 'prod-1', variationId: 'var-1', optionId: 'opt-1', value: 'Grande' })).rejects.toThrow('Not Found');
  });

  it('should reject missing product before updating an option', async () => {
    mockProductRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute({ tenantId: 'tenant-1', productId: 'prod-1', variationId: 'var-1', optionId: 'opt-1', value: 'Grande' })).rejects.toThrow('Not Found');
    expect(mockVariationRepo.findById).not.toHaveBeenCalled();
  });

  it('should reject missing variation before updating an option', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute({ tenantId: 'tenant-1', productId: 'prod-1', variationId: 'var-1', optionId: 'opt-1', value: 'Grande' })).rejects.toThrow('Not Found');
    expect(mockOptionRepo.findById).not.toHaveBeenCalled();
  });

  it('should reject option from another variation', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());
    mockOptionRepo.findById.mockResolvedValue(option({ variationId: 'var-2' }));

    await expect(useCase.execute({ tenantId: 'tenant-1', productId: 'prod-1', variationId: 'var-1', optionId: 'opt-1', value: 'Grande' })).rejects.toThrow('Not Found');
  });

  it('should reject invalid price modifier', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());
    mockOptionRepo.findById.mockResolvedValue(option());

    await expect(useCase.execute({ tenantId: 'tenant-1', productId: 'prod-1', variationId: 'var-1', optionId: 'opt-1', priceModifierCents: -1000000 })).rejects.toThrow('Price modifier cents');
  });

  it('should keep existing fields when update data is partial', async () => {
    mockProductRepo.findById.mockResolvedValue(product());
    mockVariationRepo.findById.mockResolvedValue(variation());
    mockOptionRepo.findById.mockResolvedValue(option());
    mockOptionRepo.update.mockImplementation(async (updated) => updated);

    const result = await useCase.execute({ tenantId: 'tenant-1', productId: 'prod-1', variationId: 'var-1', optionId: 'opt-1', sortOrder: 5 });

    expect(result.value).toBe('Grande');
    expect(result.priceModifierCents).toBe(500);
    expect(result.sortOrder).toBe(5);
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

function variation(): ProductVariation {
  return new ProductVariation({ id: 'var-1', productId: 'prod-1', label: 'Tamanho', sortOrder: 0, createdAt: new Date() });
}

function option(overrides: Partial<VariationOption> = {}): VariationOption {
  return new VariationOption({ id: 'opt-1', variationId: 'var-1', value: 'Grande', priceModifierCents: 500, sortOrder: 0, createdAt: new Date(), ...overrides });
}
