import { IProductRepository } from '../../repositories/IProductRepository';
import { Product } from '../../models/Product';

export class ToggleProductAvailabilityUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string, tenantId: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product || product.tenantId !== tenantId) {
      throw new Error('Not Found: Product not found or unauthorized');
    }

    return this.productRepository.toggleAvailability(id, !product.available);
  }
}
