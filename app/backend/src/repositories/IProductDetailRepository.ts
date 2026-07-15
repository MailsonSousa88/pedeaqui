import { ProductDetail } from '../dtos/ProductDetailDTO';

export interface IProductDetailRepository {
  findPublicById(productId: string): Promise<ProductDetail | null>;
  findByIdForTenant(productId: string, tenantId: string): Promise<ProductDetail | null>;
}
