import { DeleteCategoryUseCase } from '../DeleteCategoryUseCase';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';
import { IProductRepository } from '../../../repositories/IProductRepository';
import { Category } from '../../../models/Category';

describe('DeleteCategoryUseCase', () => {
  let deleteCategoryUseCase: DeleteCategoryUseCase;
  let mockCategoryRepository: jest.Mocked<ICategoryRepository>;
  let mockProductRepository: jest.Mocked<IProductRepository>;

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

    mockProductRepository = {
      findById: jest.fn(),
      findByStoreId: jest.fn(),
      findByCategoryId: jest.fn(),
      countActiveByCategoryId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    };

    deleteCategoryUseCase = new DeleteCategoryUseCase(mockCategoryRepository, mockProductRepository);
  });

  it('should soft delete category successfully', async () => {
    mockCategoryRepository.findById.mockResolvedValue({ id: 'cat-1', tenantId: 'tenant-1', storeId: 'store-1' } as Category);
    mockCategoryRepository.countActiveByStoreId.mockResolvedValue(2); // tem mais de 1
    mockProductRepository.countActiveByCategoryId.mockResolvedValue(0); // nao tem produtos
    
    await deleteCategoryUseCase.execute('cat-1', 'tenant-1');

    expect(mockCategoryRepository.softDelete).toHaveBeenCalledWith('cat-1');
  });

  it('should fail if category does not exist', async () => {
    mockCategoryRepository.findById.mockResolvedValue(null);

    await expect(deleteCategoryUseCase.execute('cat-1', 'tenant-1'))
      .rejects.toThrow('Not Found: Category not found or unauthorized');
  });

  it('should fail if category belongs to another tenant', async () => {
    mockCategoryRepository.findById.mockResolvedValue({ id: 'cat-1', tenantId: 'tenant-999', storeId: 'store-1' } as Category);

    await expect(deleteCategoryUseCase.execute('cat-1', 'tenant-1'))
      .rejects.toThrow('Not Found: Category not found or unauthorized');
  });

  it('should fail if it is the last active category of the store', async () => {
    mockCategoryRepository.findById.mockResolvedValue({ id: 'cat-1', tenantId: 'tenant-1', storeId: 'store-1' } as Category);
    mockCategoryRepository.countActiveByStoreId.mockResolvedValue(1); 
    mockProductRepository.countActiveByCategoryId.mockResolvedValue(0); 

    await expect(deleteCategoryUseCase.execute('cat-1', 'tenant-1'))
      .rejects.toThrow('Conflict: A loja deve possuir pelo menos uma categoria ativa.');
    expect(mockCategoryRepository.softDelete).not.toHaveBeenCalled();
  });

  it('should fail if category has active products', async () => {
    mockCategoryRepository.findById.mockResolvedValue({ id: 'cat-1', tenantId: 'tenant-1', storeId: 'store-1' } as Category);
    mockCategoryRepository.countActiveByStoreId.mockResolvedValue(3); 
    mockProductRepository.countActiveByCategoryId.mockResolvedValue(5); 

    await expect(deleteCategoryUseCase.execute('cat-1', 'tenant-1'))
      .rejects.toThrow('Conflict: Remova ou inative os produtos desta categoria antes de excluí-la.');
    expect(mockCategoryRepository.softDelete).not.toHaveBeenCalled();
  });
});
