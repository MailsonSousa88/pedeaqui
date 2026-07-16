import { UpdateStoreUseCase } from '../UpdateStoreUseCase';
import { IStoreRepository } from '../../../repositories/IStoreRepository';
import { Store } from '../../../models/Store';

describe('UpdateStoreUseCase', () => {
  let updateStoreUseCase: UpdateStoreUseCase;
  let mockStoreRepository: jest.Mocked<IStoreRepository>;
  let mockStore: Store;

  beforeEach(() => {
    mockStore = new Store({
      id: 'store-1',
      tenantId: 'tenant-1',
      slug: 'my-store',
      storeName: 'My Store',
      horarioAbertura: '08:00',
      horarioFechamento: '18:00',
      endereco: 'Rua A',
      city: 'Sao Paulo',
      state: 'SP',
      descricao: null,
      logoUrl: null,
      whatsappNumber: '123',
      active: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

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
      horarioAbertura: '09:00',
      city: 'Teresina',
      state: 'PI'
    });

    expect(result.storeName).toBe('New Name');
    expect(result.horarioAbertura).toBe('09:00');
    expect(result.city).toBe('Teresina');
    expect(result.state).toBe('PI');
    expect(mockStoreRepository.update).toHaveBeenCalled();
  });

  it('should update all editable store fields', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);
    mockStoreRepository.update.mockImplementation(async (store) => store);

    const result = await updateStoreUseCase.execute('store-1', 'tenant-1', {
      storeName: 'Full Update',
      horarioAbertura: '10:00',
      horarioFechamento: '22:00',
      endereco: 'Rua B',
      city: 'Teresina',
      state: 'PI',
      descricao: 'Nova descricao',
      logoUrl: 'https://cdn.example.com/logo.png',
      whatsappNumber: '11999990000'
    });

    expect(result.storeName).toBe('Full Update');
    expect(result.horarioAbertura).toBe('10:00');
    expect(result.horarioFechamento).toBe('22:00');
    expect(result.endereco).toBe('Rua B');
    expect(result.city).toBe('Teresina');
    expect(result.state).toBe('PI');
    expect(result.descricao).toBe('Nova descricao');
    expect(result.logoUrl).toBe('https://cdn.example.com/logo.png');
    expect(result.whatsappNumber).toBe('11999990000');
  });

  it('should clear nullable fields when empty strings are provided', async () => {
    mockStore.descricao = 'Descricao antiga';
    mockStore.logoUrl = 'https://cdn.example.com/old-logo.png';
    mockStoreRepository.findById.mockResolvedValue(mockStore);
    mockStoreRepository.update.mockImplementation(async (store) => store);

    const result = await updateStoreUseCase.execute('store-1', 'tenant-1', {
      horarioAbertura: '',
      horarioFechamento: '',
      descricao: '',
      logoUrl: ''
    });

    expect(result.horarioAbertura).toBeNull();
    expect(result.horarioFechamento).toBeNull();
    expect(result.descricao).toBeNull();
    expect(result.logoUrl).toBeNull();
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

  it('should update slug when the new slug is available', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);
    mockStoreRepository.findBySlug.mockResolvedValue(null);
    mockStoreRepository.update.mockImplementation(async (store) => store);

    const result = await updateStoreUseCase.execute('store-1', 'tenant-1', { slug: 'new-store' });

    expect(result.slug).toBe('new-store');
    expect(mockStoreRepository.findBySlug).toHaveBeenCalledWith('new-store');
    expect(mockStoreRepository.update).toHaveBeenCalled();
  });

  it('should not check slug if the provided slug is the same as the current', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);
    mockStoreRepository.update.mockImplementation(async (store) => store);

    const result = await updateStoreUseCase.execute('store-1', 'tenant-1', { slug: 'my-store', storeName: 'Updated' });

    expect(result.storeName).toBe('Updated');
    expect(result.city).toBe('Sao Paulo');
    expect(result.state).toBe('SP');
    expect(mockStoreRepository.findBySlug).not.toHaveBeenCalled();
    expect(mockStoreRepository.update).toHaveBeenCalled();
  });

  it('should fail if city is empty', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);

    await expect(updateStoreUseCase.execute('store-1', 'tenant-1', { city: '' }))
      .rejects.toThrow('Store city is required');
    expect(mockStoreRepository.update).not.toHaveBeenCalled();
  });

  it('should fail if state is not a two-letter uppercase UF', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);

    await expect(updateStoreUseCase.execute('store-1', 'tenant-1', { state: 'sp' }))
      .rejects.toThrow('Store state must be a two-letter uppercase UF');
    expect(mockStoreRepository.update).not.toHaveBeenCalled();
  });
});
