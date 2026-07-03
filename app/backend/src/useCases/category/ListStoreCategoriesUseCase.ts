import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { IStoreRepository } from '../../repositories/IStoreRepository';
import { Category } from '../../models/Category';

export class ListStoreCategoriesUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private storeRepository: IStoreRepository
  ) {}

  async execute(storeId: string): Promise<Category[]> {
    const store = await this.storeRepository.findById(storeId);
    
    // Opcional: Se a listagem for pública, a validação de tenantId não ocorre.
    if (!store) {
      throw new Error('Not Found: Store not found');
    }

    return this.categoryRepository.findByStoreId(storeId);
  }
}
