import { ProductDetail } from '../../../dtos/ProductDetailDTO';
import { IProductDetailRepository } from '../../../repositories/IProductDetailRepository';
import { GetPublicProductDetailUseCase } from '../GetPublicProductDetailUseCase';

describe('GetPublicProductDetailUseCase', () => {
  let useCase: GetPublicProductDetailUseCase;
  let repository: jest.Mocked<IProductDetailRepository>;

  beforeEach(() => {
    repository = {
      findPublicById: jest.fn(),
      findByIdForTenant: jest.fn(),
    };
    useCase = new GetPublicProductDetailUseCase(repository);
  });

  it('should return the public product detail', async () => {
    const detail = productDetail();
    repository.findPublicById.mockResolvedValue(detail);

    await expect(useCase.execute('product-1')).resolves.toBe(detail);
    expect(repository.findPublicById).toHaveBeenCalledWith('product-1');
  });

  it('should reject when the public product is not found', async () => {
    repository.findPublicById.mockResolvedValue(null);

    await expect(useCase.execute('product-1')).rejects.toThrow('Not Found: Product not found');
  });
});

function productDetail(): ProductDetail {
  return {
    id: 'product-1', storeId: 'store-1', categoryId: 'category-1', name: 'Pizza', description: null,
    priceCents: 2500, promoPriceCents: null, promoEndsAt: null, details: {}, available: true,
    images: [], variations: [], createdAt: new Date(), updatedAt: new Date(),
  };
}
