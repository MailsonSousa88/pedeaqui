import { IStoreRepository } from '../../repositories/IStoreRepository';
import { Store } from '../../models/Store';
import { IUpdateStoreDTO } from '../../dtos/StoreDTOs';

export class UpdateStoreUseCase {
  constructor(private storeRepository: IStoreRepository) {}

  async execute(id: string, tenantId: string, data: IUpdateStoreDTO): Promise<Store> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new Error('Not Found: Store not found');
    }

    if (store.tenantId !== tenantId) {
      throw new Error('Forbidden: Store does not belong to this tenant');
    }

    if (data.slug && data.slug !== store.slug) {
      const existingSlug = await this.storeRepository.findBySlug(data.slug);
      if (existingSlug) {
        throw new Error('Conflict: Store with this slug already exists');
      }
      store.slug = data.slug;
    }

    if (data.storeName !== undefined) store.storeName = data.storeName;
    if (data.horarioAbertura !== undefined) store.horarioAbertura = data.horarioAbertura || null;
    if (data.horarioFechamento !== undefined) store.horarioFechamento = data.horarioFechamento || null;
    if (data.endereco !== undefined) store.endereco = data.endereco;
    if (data.descricao !== undefined) store.descricao = data.descricao || null;
    if (data.logoUrl !== undefined) store.logoUrl = data.logoUrl || null;
    if (data.whatsappNumber !== undefined) store.whatsappNumber = data.whatsappNumber;

    store.updatedAt = new Date();

    return this.storeRepository.update(store);
  }
}
