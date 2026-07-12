import { ToggleStoreUseCase } from '../ToggleStoreUseCase';
import { IStoreRepository } from '../../../repositories/IStoreRepository';
import { Store } from '../../../models/Store';

describe('ToggleStoreUseCase', () => {
  let toggleStoreUseCase: ToggleStoreUseCase;
  let mockStoreRepository: jest.Mocked<IStoreRepository>;

  const mockStore = new Store({
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

  beforeEach(() => {
    mockStoreRepository = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      findBySlug: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    toggleStoreUseCase = new ToggleStoreUseCase(mockStoreRepository);
  });

  it('should toggle store active state successfully', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);
    mockStoreRepository.update.mockImplementation(async (store) => store);

    const result = await toggleStoreUseCase.execute('store-1', 'tenant-1', false);

    expect(result.active).toBe(false);
    expect(mockStoreRepository.update).toHaveBeenCalled();
  });

  it('should fail if store belongs to another tenant', async () => {
    mockStoreRepository.findById.mockResolvedValue(mockStore);

    await expect(toggleStoreUseCase.execute('store-1', 'tenant-2', false))
      .rejects.toThrow('Forbidden: Store does not belong to this tenant');
  });

  it('should fail if store does not exist', async () => {
    mockStoreRepository.findById.mockResolvedValue(null);

    await expect(toggleStoreUseCase.execute('store-1', 'tenant-1', false))
      .rejects.toThrow('Not Found: Store not found');
  });
});
