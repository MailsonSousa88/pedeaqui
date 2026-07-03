import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { IStoreRepository } from '../../repositories/IStoreRepository';
import { Category } from '../../models/Category';
import { ICreateCategoryDTO } from '../../dtos/CategoryDTOs';
import * as crypto from 'crypto';

export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private storeRepository: IStoreRepository
  ) {}

  async execute(data: ICreateCategoryDTO): Promise<Category> {
    // Verifica se a loja existe e pertence ao tenantId (Security/Isolation)
    const store = await this.storeRepository.findById(data.storeId);
    
    if (!store || store.tenantId !== data.tenantId) {
      throw new Error('Forbidden: Unauthorized to create categories for this store');
    }

    const newCategory = new Category({
      id: crypto.randomUUID(),
      storeId: data.storeId,
      tenantId: data.tenantId,
      name: data.name,
      description: data.description || null,
      sortOrder: data.sortOrder ?? 0,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return this.categoryRepository.create(newCategory);
  }
}
