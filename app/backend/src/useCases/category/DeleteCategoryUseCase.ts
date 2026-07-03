import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { IProductRepository } from '../../repositories/IProductRepository';

export class DeleteCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private productRepository: IProductRepository
  ) {}

  async execute(id: string, tenantId: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category || category.tenantId !== tenantId) {
      throw new Error('Not Found: Category not found or unauthorized');
    }

    // Regra 1: A loja não pode ficar sem categorias ativas
    const activeCategoriesCount = await this.categoryRepository.countActiveByStoreId(category.storeId);
    if (activeCategoriesCount <= 1) {
      throw new Error('Conflict: A loja deve possuir pelo menos uma categoria ativa.');
    }

    // Regra 2: A categoria não pode ter produtos ativos atrelados
    const activeProductsCount = await this.productRepository.countActiveByCategoryId(id);
    if (activeProductsCount > 0) {
      throw new Error('Conflict: Remova ou inative os produtos desta categoria antes de excluí-la.');
    }

    await this.categoryRepository.softDelete(id);
  }
}
