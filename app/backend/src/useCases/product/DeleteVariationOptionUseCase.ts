import { IProductRepository } from '../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../repositories/IProductVariationRepository';
import { IVariationOptionRepository } from '../../repositories/IVariationOptionRepository';

export class DeleteVariationOptionUseCase {
  constructor(
    private productRepository: IProductRepository,
    private variationRepository: IProductVariationRepository,
    private optionRepository: IVariationOptionRepository
  ) {}

  async execute(productId: string, variationId: string, optionId: string, tenantId: string): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (!product || product.tenantId !== tenantId) {
      throw new Error('Not Found: Product not found or unauthorized');
    }

    const variation = await this.variationRepository.findById(variationId);
    if (!variation || variation.productId !== productId) {
      throw new Error('Not Found: Product variation not found for product');
    }

    const option = await this.optionRepository.findById(optionId);
    if (!option || option.variationId !== variationId) {
      throw new Error('Not Found: Variation option not found for variation');
    }

    await this.optionRepository.delete(optionId);
  }
}
