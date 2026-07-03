import { DeleteStoreUseCase } from '../DeleteStoreUseCase';
import { IStoreRepository } from '../../../repositories/IStoreRepository';
import { Store } from '../../../models/Store';

describe('DeleteStoreUseCase', () => {
  let deleteStoreUseCase: DeleteStoreUseCase;
  let mockStoreRepository: jest.Mocked<IStoreRepository>;

  const mockStore = new Store({
    id: 'store-1',
    tenantId: 'tenant-1',
    slug: 'my-store',
    storeName: 'My Store',
    horarioAbertura: '08:00',
    horarioFechamento: '18:00',
    endereco: 'Rua A',
    descricao: null,
    logoUrl: null,
    whatsappNumber: '123',
    active: true,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  beforeEach(() => {
    mockStoreRepository = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      findBySlug: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    deleteStoreUseCase = new DeleteStoreUseCase(mockStoreRepository);
  });

  it('should soft delete a store successfully', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);

    await deleteStoreUseCase.execute('store-1', 'tenant-1');

    expect(mockStore.deletedAt).not.toBeNull();
    expect(mockStore.active).toBe(false);
    expect(mockStoreRepository.update).toHaveBeenCalledWith(mockStore);
  });

  it('should fail if store belongs to another tenant', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);

    await expect(deleteStoreUseCase.execute('store-1', 'tenant-2'))
      .rejects.toThrow('Forbidden: Store does not belong to this tenant');
  });

  it('should fail if store does not exist', async () => {
    mockStoreRepository.findById.mockResolvedValue(null);

    await expect(deleteStoreUseCase.execute('store-1', 'tenant-1'))
      .rejects.toThrow('Not Found: Store not found');
  });
});
