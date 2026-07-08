import { CreateStoreUseCase } from '../CreateStoreUseCase';
import { ICreateStoreDTO } from '../../../dtos/StoreDTOs';
import { IStoreRepository } from '../../../repositories/IStoreRepository';
import { ISubscriptionRepository } from '../../../repositories/ISubscriptionRepository';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';
import { Store } from '../../../models/Store';
import { Subscription } from '../../../models/Subscription';

describe('CreateStoreUseCase', () => {
  let createStoreUseCase: CreateStoreUseCase;
  let mockStoreRepository: jest.Mocked<IStoreRepository>;
  let mockSubscriptionRepository: jest.Mocked<ISubscriptionRepository>;
  let mockCategoryRepository: jest.Mocked<ICategoryRepository>;

  const now = new Date();
  const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const validStoreDTO: ICreateStoreDTO = {
    tenantId: 'tenant-123',
    slug: 'my-store',
    storeName: 'My Store',
    horarioAbertura: '08:00',
    horarioFechamento: '18:00',
    endereco: 'Rua Teste',
    whatsappNumber: '11999999999'
  };

  const activeSubscription = new Subscription({
    id: 'sub-123',
    tenantId: 'tenant-123',
    planId: null, // trial — plan_id é nullable
    status: 'active',
    startsAt: now,
    endsAt: thirtyDaysLater,
    createdAt: now,
    updatedAt: now
  });

  beforeEach(() => {
    mockStoreRepository = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      findBySlug: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    };

    mockSubscriptionRepository = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      createOrUpdate: jest.fn()
    };

    mockCategoryRepository = {
      findById: jest.fn(),
      findByStoreId: jest.fn(),
      countActiveByStoreId: jest.fn(),
      findByTenantId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    };

    // Por padrão: tenant tem subscription ativa (trial) e sem loja existente
    mockSubscriptionRepository.findByTenantId.mockResolvedValue(activeSubscription);
    mockStoreRepository.findByTenantId.mockResolvedValue(null);
    mockStoreRepository.findBySlug.mockResolvedValue(null);
    mockCategoryRepository.create.mockImplementation(async (cat) => cat);

    createStoreUseCase = new CreateStoreUseCase(
      mockStoreRepository,
      mockSubscriptionRepository,
      mockCategoryRepository
    );
  });

  it('should be able to create a new store and default category', async () => {
    mockStoreRepository.create.mockImplementation(async (store) => store);

    const result = await createStoreUseCase.execute(validStoreDTO);

    expect(result).toBeInstanceOf(Store);
    expect(result.slug).toBe('my-store');
    expect(mockSubscriptionRepository.findByTenantId).toHaveBeenCalledWith('tenant-123');
    expect(mockStoreRepository.create).toHaveBeenCalled();
    // Categoria padrão "Todos" deve ser criada
    expect(mockCategoryRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Todos', tenantId: 'tenant-123' })
    );
  });

  it('should not be able to create a store with an existing slug', async () => {
    const existingStore = new Store({
      id: 'existing-id',
      tenantId: 'tenant-other',
      slug: 'my-store',
      storeName: 'Existing',
      horarioAbertura: '08:00',
      horarioFechamento: '18:00',
      endereco: 'Rua Existente',
      descricao: null,
      logoUrl: null,
      whatsappNumber: '11988888888',
      active: true,
      deletedAt: null,
      createdAt: now,
      updatedAt: now
    });
    mockStoreRepository.findBySlug.mockResolvedValue(existingStore);

    await expect(createStoreUseCase.execute(validStoreDTO)).rejects.toThrow(
      'Store with this slug already exists'
    );
    expect(mockCategoryRepository.create).not.toHaveBeenCalled();
  });

  it('should block store creation if there is no active subscription plan', async () => {
    const canceledSubscription = new Subscription({
      id: 'sub-456',
      tenantId: 'tenant-123',
      planId: null,
      status: 'canceled',
      startsAt: now,
      endsAt: thirtyDaysLater,
      createdAt: now,
      updatedAt: now
    });
    mockSubscriptionRepository.findByTenantId.mockResolvedValue(canceledSubscription);

    await expect(createStoreUseCase.execute(validStoreDTO)).rejects.toThrow(
      'Forbidden: No active subscription plan'
    );
    expect(mockStoreRepository.create).not.toHaveBeenCalled();
  });

  it('should block store creation if there is no subscription at all', async () => {
    mockSubscriptionRepository.findByTenantId.mockResolvedValue(null);

    await expect(createStoreUseCase.execute(validStoreDTO)).rejects.toThrow(
      'Forbidden: No active subscription plan'
    );
    expect(mockStoreRepository.create).not.toHaveBeenCalled();
  });

  it('should block store creation if tenant already has a store', async () => {
    const existingTenantStore = new Store({
      id: 'store-existing',
      tenantId: 'tenant-123',
      slug: 'old-store',
      storeName: 'Old Store',
      horarioAbertura: '08:00',
      horarioFechamento: '18:00',
      endereco: 'Rua Velha',
      descricao: null,
      logoUrl: null,
      whatsappNumber: '11999999999',
      active: true,
      deletedAt: null,
      createdAt: now,
      updatedAt: now
    });
    mockStoreRepository.findByTenantId.mockResolvedValue(existingTenantStore);

    await expect(createStoreUseCase.execute(validStoreDTO)).rejects.toThrow(
      'Conflict: Tenant already has a store'
    );
    expect(mockCategoryRepository.create).not.toHaveBeenCalled();
  });
});
