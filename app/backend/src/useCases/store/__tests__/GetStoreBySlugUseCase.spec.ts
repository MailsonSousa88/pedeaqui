import { GetStoreBySlugUseCase } from '../GetStoreBySlugUseCase';
import { IStoreRepository } from '../../../repositories/IStoreRepository';
import { Store } from '../../../models/Store';

describe('GetStoreBySlugUseCase', () => {
  let getStoreBySlugUseCase: GetStoreBySlugUseCase;
  let mockStoreRepository: jest.Mocked<IStoreRepository>;

  const createMockStore = (horarioAbertura: string | null, horarioFechamento: string | null, active = true) => {
    return new Store({
      id: 'store-1',
      tenantId: 'tenant-1',
      slug: 'my-store',
      storeName: 'My Store',
      horarioAbertura,
      horarioFechamento,
      endereco: 'Rua A',
      descricao: null,
      logoUrl: null,
      whatsappNumber: '123',
      active,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  };

  beforeEach(() => {
    mockStoreRepository = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      findBySlug: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    getStoreBySlugUseCase = new GetStoreBySlugUseCase(mockStoreRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return store as active if current time is within hours', async () => {
    // Mock current time to 12:00
    jest.spyOn(global.Date.prototype, 'getHours').mockReturnValue(12);
    jest.spyOn(global.Date.prototype, 'getMinutes').mockReturnValue(0);

    const store = createMockStore('10:00', '18:00');
    mockStoreRepository.findBySlug.mockResolvedValue(store);

    const result = await getStoreBySlugUseCase.execute('my-store');
    expect(result.active).toBe(true);
  });

  it('should return store as inactive if current time is outside hours', async () => {
    // Mock current time to 20:00
    jest.spyOn(global.Date.prototype, 'getHours').mockReturnValue(20);
    jest.spyOn(global.Date.prototype, 'getMinutes').mockReturnValue(0);

    const store = createMockStore('10:00', '18:00');
    mockStoreRepository.findBySlug.mockResolvedValue(store);

    const result = await getStoreBySlugUseCase.execute('my-store');
    expect(result.active).toBe(false);
  });

  it('should return store as active if hours are null', async () => {
    const store = createMockStore(null, null);
    mockStoreRepository.findBySlug.mockResolvedValue(store);

    const result = await getStoreBySlugUseCase.execute('my-store');
    expect(result.active).toBe(true);
  });

  it('should return store as inactive if manually deactivated regardless of hours', async () => {
    jest.spyOn(global.Date.prototype, 'getHours').mockReturnValue(12);
    jest.spyOn(global.Date.prototype, 'getMinutes').mockReturnValue(0);

    const store = createMockStore('10:00', '18:00', false);
    mockStoreRepository.findBySlug.mockResolvedValue(store);

    const result = await getStoreBySlugUseCase.execute('my-store');
    expect(result.active).toBe(false);
  });

  it('should fail if store does not exist', async () => {
    mockStoreRepository.findBySlug.mockResolvedValue(null);

    await expect(getStoreBySlugUseCase.execute('not-found-slug'))
      .rejects.toThrow('Not Found: Store not found');
  });
});
