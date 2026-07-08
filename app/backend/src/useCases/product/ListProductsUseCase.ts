import { IProductRepository } from '../../repositories/IProductRepository';
import { IStoreRepository } from '../../repositories/IStoreRepository';
import { Product } from '../../models/Product';

export class ListProductsUseCase {
  constructor(
    private productRepository: IProductRepository,
    private storeRepository: IStoreRepository
  ) {}

  async execute(storeId: string): Promise<Product[]> {
    const store = await this.storeRepository.findById(storeId);
    if (!store) {
      throw new Error('Not Found: Store not found');
    }

    return this.productRepository.findByStoreId(storeId);
  }
}
