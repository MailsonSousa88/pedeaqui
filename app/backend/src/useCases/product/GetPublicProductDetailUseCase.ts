import { ProductDetail } from '../../dtos/ProductDetailDTO';
import { IProductDetailRepository } from '../../repositories/IProductDetailRepository';

export class GetPublicProductDetailUseCase {
  constructor(private productDetailRepository: IProductDetailRepository) {}

  async execute(productId: string): Promise<ProductDetail> {
    const product = await this.productDetailRepository.findPublicById(productId);

    if (!product) {
      throw new Error('Not Found: Product not found');
    }

    return product;
  }
}
