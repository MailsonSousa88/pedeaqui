import { IStoreRepository } from '../../repositories/IStoreRepository';
import { Store } from '../../models/Store';

export class ToggleStoreUseCase {
  constructor(private storeRepository: IStoreRepository) {}

  async execute(id: string, tenantId: string, active: boolean): Promise<Store> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new Error('Not Found: Store not found');
    }

    if (store.tenantId !== tenantId) {
      throw new Error('Forbidden: Store does not belong to this tenant');
    }

    store.active = active;
    store.updatedAt = new Date();

    return this.storeRepository.update(store);
  }
}
