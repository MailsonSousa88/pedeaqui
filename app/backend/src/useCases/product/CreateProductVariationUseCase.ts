import * as crypto from 'crypto';
import { IProductRepository } from '../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../repositories/IProductVariationRepository';
import { ProductVariation } from '../../models/ProductVariation';
import { ICreateProductVariationDTO } from '../../dtos/ProductVariationDTOs';

export class CreateProductVariationUseCase {
  constructor(
    private productRepository: IProductRepository,
    private variationRepository: IProductVariationRepository
  ) {}

  async execute(data: ICreateProductVariationDTO): Promise<ProductVariation> {
    const product = await this.productRepository.findById(data.productId);
    if (!product || product.tenantId !== data.tenantId) {
      throw new Error('Not Found: Product not found or unauthorized');
    }

    const variation = new ProductVariation({
      id: crypto.randomUUID(),
      productId: data.productId,
      label: data.label,
      sortOrder: data.sortOrder !== undefined ? data.sortOrder : 0,
      createdAt: new Date()
    });

    return this.variationRepository.create(variation);
  }
}
