import { IProductRepository } from '../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../repositories/IProductVariationRepository';
import { IVariationOptionRepository } from '../../repositories/IVariationOptionRepository';
import { VariationOption } from '../../models/VariationOption';

export class ListVariationOptionsUseCase {
  constructor(
    private productRepository: IProductRepository,
    private variationRepository: IProductVariationRepository,
    private optionRepository: IVariationOptionRepository
  ) {}

  async execute(productId: string, variationId: string, tenantId: string): Promise<VariationOption[]> {
    const product = await this.productRepository.findById(productId);
    if (!product || product.tenantId !== tenantId) {
      throw new Error('Not Found: Product not found or unauthorized');
    }

    const variation = await this.variationRepository.findById(variationId);
    if (!variation || variation.productId !== productId) {
      throw new Error('Not Found: Product variation not found for product');
    }

    return this.optionRepository.findByVariationId(variationId);
  }
}
