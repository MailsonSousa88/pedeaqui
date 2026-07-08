import { IProductRepository } from '../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../repositories/IProductVariationRepository';
import { ProductVariation } from '../../models/ProductVariation';
import { IUpdateProductVariationDTO } from '../../dtos/ProductVariationDTOs';

export class UpdateProductVariationUseCase {
  constructor(
    private productRepository: IProductRepository,
    private variationRepository: IProductVariationRepository
  ) {}

  async execute(data: IUpdateProductVariationDTO): Promise<ProductVariation> {
    const product = await this.productRepository.findById(data.productId);
    if (!product || product.tenantId !== data.tenantId) {
      throw new Error('Not Found: Product not found or unauthorized');
    }

    const variation = await this.variationRepository.findById(data.variationId);
    if (!variation || variation.productId !== data.productId) {
      throw new Error('Not Found: Product variation not found for product');
    }

    if (data.label !== undefined) variation.label = data.label;
    if (data.sortOrder !== undefined) variation.sortOrder = data.sortOrder;

    return this.variationRepository.update(variation);
  }
}
