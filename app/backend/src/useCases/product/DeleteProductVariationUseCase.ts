import { IProductRepository } from '../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../repositories/IProductVariationRepository';

export class DeleteProductVariationUseCase {
  constructor(
    private productRepository: IProductRepository,
    private variationRepository: IProductVariationRepository
  ) {}

  async execute(productId: string, variationId: string, tenantId: string): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (!product || product.tenantId !== tenantId) {
      throw new Error('Not Found: Product not found or unauthorized');
    }

    const variation = await this.variationRepository.findById(variationId);
    if (!variation || variation.productId !== productId) {
      throw new Error('Not Found: Product variation not found for product');
    }

    await this.variationRepository.delete(variationId);
  }
}
