import { UpdateStoreUseCase } from '../UpdateStoreUseCase';
import { IStoreRepository } from '../../../repositories/IStoreRepository';
import { Store } from '../../../models/Store';

describe('UpdateStoreUseCase', () => {
  let updateStoreUseCase: UpdateStoreUseCase;
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

    updateStoreUseCase = new UpdateStoreUseCase(mockStoreRepository);
  });

  it('should update a store successfully', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);
    mockStoreRepository.update.mockImplementation(async (store) => store);

    const result = await updateStoreUseCase.execute('store-1', 'tenant-1', {
      storeName: 'New Name',
      horarioAbertura: '09:00'
    });

    expect(result.storeName).toBe('New Name');
    expect(result.horarioAbertura).toBe('09:00');
    expect(mockStoreRepository.update).toHaveBeenCalled();
  });

  it('should fail if store does not exist', async () => {
    mockStoreRepository.findById.mockResolvedValue(null);

    await expect(updateStoreUseCase.execute('store-1', 'tenant-1', {}))
      .rejects.toThrow('Not Found: Store not found');
  });

  it('should fail if store belongs to another tenant', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);

    await expect(updateStoreUseCase.execute('store-1', 'tenant-2', {}))
      .rejects.toThrow('Forbidden: Store does not belong to this tenant');
  });

  it('should fail if new slug is already in use', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);
    mockStoreRepository.findBySlug.mockResolvedValue(new Store({...mockStore, id: 'store-2'}));

    await expect(updateStoreUseCase.execute('store-1', 'tenant-1', { slug: 'other-slug' }))
      .rejects.toThrow('Conflict: Store with this slug already exists');
  });

  it('should not check slug if the provided slug is the same as the current', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);
    mockStoreRepository.update.mockImplementation(async (store) => store);

    const result = await updateStoreUseCase.execute('store-1', 'tenant-1', { slug: 'my-store', storeName: 'Updated' });

    expect(result.storeName).toBe('Updated');
    expect(mockStoreRepository.findBySlug).not.toHaveBeenCalled();
    expect(mockStoreRepository.update).toHaveBeenCalled();
  });
});
