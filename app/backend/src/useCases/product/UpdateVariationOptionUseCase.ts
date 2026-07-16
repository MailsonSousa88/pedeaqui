import { IProductRepository } from '../../repositories/IProductRepository';
import { IProductVariationRepository } from '../../repositories/IProductVariationRepository';
import { IVariationOptionRepository } from '../../repositories/IVariationOptionRepository';
import { VariationOption } from '../../models/VariationOption';
import { IUpdateVariationOptionDTO } from '../../dtos/ProductVariationDTOs';

export class UpdateVariationOptionUseCase {
  constructor(
    private productRepository: IProductRepository,
    private variationRepository: IProductVariationRepository,
    private optionRepository: IVariationOptionRepository
  ) {}

  async execute(data: IUpdateVariationOptionDTO): Promise<VariationOption> {
    const product = await this.productRepository.findById(data.productId);
    if (!product || product.tenantId !== data.tenantId) {
      throw new Error('Not Found: Product not found or unauthorized');
    }

    const variation = await this.variationRepository.findById(data.variationId);
    if (!variation || variation.productId !== data.productId) {
      throw new Error('Not Found: Product variation not found for product');
    }

    const option = await this.optionRepository.findById(data.optionId);
    if (!option || option.variationId !== data.variationId) {
      throw new Error('Not Found: Variation option not found for variation');
    }

    if (data.priceModifierCents !== undefined && data.priceModifierCents <= -1000000) {
      throw new Error('Price modifier cents must be greater than -1000000');
    }

    if (data.value !== undefined) option.value = data.value;
    if (data.priceModifierCents !== undefined) option.priceModifierCents = data.priceModifierCents;
    if (data.sortOrder !== undefined) option.sortOrder = data.sortOrder;

    return this.optionRepository.update(option);
  }
}
