import { ProductDetail } from '../../../dtos/ProductDetailDTO';
import { IProductDetailRepository } from '../../../repositories/IProductDetailRepository';
import { GetMerchantProductDetailUseCase } from '../GetMerchantProductDetailUseCase';

describe('GetMerchantProductDetailUseCase', () => {
  let useCase: GetMerchantProductDetailUseCase;
  let repository: jest.Mocked<IProductDetailRepository>;

  beforeEach(() => {
    repository = {
      findPublicById: jest.fn(),
      findByIdForTenant: jest.fn(),
    };
    useCase = new GetMerchantProductDetailUseCase(repository);
  });

  it('should return the merchant product detail', async () => {
    const detail = productDetail();
    repository.findByIdForTenant.mockResolvedValue(detail);

    await expect(useCase.execute('product-1', 'tenant-1')).resolves.toBe(detail);
    expect(repository.findByIdForTenant).toHaveBeenCalledWith('product-1', 'tenant-1');
  });

  it('should reject when the product is not found for the tenant', async () => {
    repository.findByIdForTenant.mockResolvedValue(null);

    await expect(useCase.execute('product-1', 'tenant-1')).rejects.toThrow('Not Found: Product not found');
  });
});

function productDetail(): ProductDetail {
  return {
    id: 'product-1', storeId: 'store-1', categoryId: 'category-1', name: 'Pizza', description: null,
    priceCents: 2500, promoPriceCents: null, promoEndsAt: null, details: {}, available: false,
    images: [], variations: [], createdAt: new Date(), updatedAt: new Date(),
  };
}
