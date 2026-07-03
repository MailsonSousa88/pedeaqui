import { Product } from '../models/Product';

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findByStoreId(storeId: string): Promise<Product[]>;
  findByCategoryId(categoryId: string): Promise<Product[]>;
  countActiveByCategoryId(categoryId: string): Promise<number>;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  toggleAvailability(id: string, available: boolean): Promise<Product>;
  softDelete(id: string): Promise<void>;
}
