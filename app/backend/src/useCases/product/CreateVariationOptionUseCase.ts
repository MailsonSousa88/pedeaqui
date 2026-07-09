import * as crypto from 'crypto';
import { IProductRepository } from '../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../repositories/IProductVariationRepository';
import { IVariationOptionRepository } from '../../repositories/IVariationOptionRepository';
import { VariationOption } from '../../models/VariationOption';
import { ICreateVariationOptionDTO } from '../../dtos/ProductVariationDTOs';

export class CreateVariationOptionUseCase {
  constructor(
    private productRepository: IProductRepository,
    private variationRepository: IProductVariationRepository,
    private optionRepository: IVariationOptionRepository
  ) {}

  async execute(data: ICreateVariationOptionDTO): Promise<VariationOption> {
    await this.validateProductAndVariation(data.productId, data.variationId, data.tenantId);

    const priceModifierCents = data.priceModifierCents !== undefined ? data.priceModifierCents : 0;
    if (priceModifierCents <= -1000000) {
      throw new Error('Price modifier cents must be greater than -1000000');
    }

    const option = new VariationOption({
      id: crypto.randomUUID(),
      variationId: data.variationId,
      value: data.value,
      priceModifierCents,
      sortOrder: data.sortOrder !== undefined ? data.sortOrder : 0,
      createdAt: new Date()
    });

    return this.optionRepository.create(option);
  }

  private async validateProductAndVariation(productId: string, variationId: string, tenantId: string): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (!product || product.tenantId !== tenantId) {
      throw new Error('Not Found: Product not found or unauthorized');
    }

    const variation = await this.variationRepository.findById(variationId);
    if (!variation || variation.productId !== productId) {
      throw new Error('Not Found: Product variation not found for product');
    }
  }
}
