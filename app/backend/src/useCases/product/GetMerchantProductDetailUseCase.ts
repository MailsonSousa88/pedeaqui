import { ProductDetail } from '../../dtos/ProductDetailDTO';
import { IProductDetailRepository } from '../../repositories/IProductDetailRepository';

export class GetMerchantProductDetailUseCase {
  constructor(private productDetailRepository: IProductDetailRepository) {}

  async execute(productId: string, tenantId: string): Promise<ProductDetail> {
    const product = await this.productDetailRepository.findByIdForTenant(productId, tenantId);

    if (!product) {
      throw new Error('Not Found: Product not found');
    }

    return product;
  }
}
