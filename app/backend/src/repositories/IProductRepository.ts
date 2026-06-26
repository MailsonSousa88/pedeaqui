import { Product } from '../models/Product';

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findByStoreId(storeId: string): Promise<Product[]>;
  findByCategoryId(categoryId: string): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
