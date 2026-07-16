import { ProductVariation } from '../models/ProductVariation';

export interface IProductVariationRepository {
  findById(id: string): Promise<ProductVariation | null>;
  findByProductId(productId: string): Promise<ProductVariation[]>;
  create(variation: ProductVariation): Promise<ProductVariation>;
  update(variation: ProductVariation): Promise<ProductVariation>;
  delete(id: string): Promise<void>;
}
