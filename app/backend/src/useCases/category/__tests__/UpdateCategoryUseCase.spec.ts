import { UpdateCategoryUseCase } from '../UpdateCategoryUseCase';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';
import { Category } from '../../../models/Category';

describe('UpdateCategoryUseCase', () => {
  let updateCategoryUseCase: UpdateCategoryUseCase;
  let mockCategoryRepository: jest.Mocked<ICategoryRepository>;

  beforeEach(() => {
    mockCategoryRepository = {
      findById: jest.fn(),
      findByStoreId: jest.fn(),
      countActiveByStoreId: jest.fn(),
      findByTenantId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    };

    updateCategoryUseCase = new UpdateCategoryUseCase(mockCategoryRepository);
  });

  it('should update a category successfully', async () => {
    const existingCategory = new Category({
      id: 'cat-1',
      storeId: 'store-1',
      tenantId: 'tenant-1',
      name: 'Old Name',
      description: null,
      sortOrder: 0,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    mockCategoryRepository.findById.mockResolvedValue(existingCategory);
    mockCategoryRepository.update.mockImplementation(async (cat) => cat);

    const result = await updateCategoryUseCase.execute('cat-1', 'tenant-1', {
      name: 'New Name',
      description: 'New Desc',
      sortOrder: 5
    });

    expect(result.name).toBe('New Name');
    expect(result.description).toBe('New Desc');
    expect(result.sortOrder).toBe(5);
    expect(mockCategoryRepository.update).toHaveBeenCalled();
  });

  it('should fail if category does not exist', async () => {
    mockCategoryRepository.findById.mockResolvedValue(null);

    await expect(updateCategoryUseCase.execute('cat-1', 'tenant-1', { name: 'Test' }))
      .rejects.toThrow('Not Found: Category not found or unauthorized');
  });

  it('should fail if category belongs to another tenant', async () => {
    const existingCategory = new Category({
      id: 'cat-1',
      storeId: 'store-1',
      tenantId: 'tenant-999',
      name: 'Old Name',
      description: null,
      sortOrder: 0,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    mockCategoryRepository.findById.mockResolvedValue(existingCategory);

    await expect(updateCategoryUseCase.execute('cat-1', 'tenant-1', { name: 'Test' }))
      .rejects.toThrow('Not Found: Category not found or unauthorized');
  });
});
