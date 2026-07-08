import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { Category } from '../../models/Category';
import { IUpdateCategoryDTO } from '../../dtos/CategoryDTOs';

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string, tenantId: string, data: IUpdateCategoryDTO): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!category || category.tenantId !== tenantId) {
      throw new Error('Not Found: Category not found or unauthorized');
    }

    if (data.name !== undefined) category.name = data.name;
    if (data.description !== undefined) category.description = data.description;
    if (data.sortOrder !== undefined) category.sortOrder = data.sortOrder;

    category.updatedAt = new Date();

    return this.categoryRepository.update(category);
  }
}
