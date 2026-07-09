import { IProductRepository } from '../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../repositories/IProductVariationRepository';
import { ProductVariation } from '../../models/ProductVariation';

export class ListProductVariationsUseCase {
  constructor(
    private productRepository: IProductRepository,
    private variationRepository: IProductVariationRepository
  ) {}

  async execute(productId: string, tenantId: string): Promise<ProductVariation[]> {
    const product = await this.productRepository.findById(productId);
    if (!product || product.tenantId !== tenantId) {
      throw new Error('Not Found: Product not found or unauthorized');
    }

    return this.variationRepository.findByProductId(productId);
  }
}
