import { Store } from '../../../models/Store';
import { IPublicStoreRepository, ListPublicStoresUseCase } from '../ListPublicStoresUseCase';

describe('ListPublicStoresUseCase', () => {
  let listPublicStoresUseCase: ListPublicStoresUseCase;
  let mockStoreRepository: jest.Mocked<IPublicStoreRepository>;

  const createMockStore = (id: string, slug: string, storeName: string) => {
    return new Store({
      id,
      tenantId: `tenant-${id}`,
      slug,
      storeName,
      horarioAbertura: '10:00',
      horarioFechamento: '18:00',
      endereco: 'Rua A',
      descricao: null,
      logoUrl: null,
      whatsappNumber: '11999990000',
      active: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  };

  beforeEach(() => {
    mockStoreRepository = {
      findPublic: jest.fn()
    };

    listPublicStoresUseCase = new ListPublicStoresUseCase(mockStoreRepository);
  });

  it('should list public stores successfully', async () => {
    const stores = [
      createMockStore('store-1', 'loja-um', 'Loja Um'),
      createMockStore('store-2', 'loja-dois', 'Loja Dois')
    ];
    mockStoreRepository.findPublic.mockResolvedValue(stores);

    const result = await listPublicStoresUseCase.execute();

    expect(result).toEqual(stores);
    expect(mockStoreRepository.findPublic).toHaveBeenCalledTimes(1);
  });

  it('should return empty list when there are no public stores', async () => {
    mockStoreRepository.findPublic.mockResolvedValue([]);

    const result = await listPublicStoresUseCase.execute();

    expect(result).toEqual([]);
    expect(mockStoreRepository.findPublic).toHaveBeenCalledTimes(1);
  });
});
