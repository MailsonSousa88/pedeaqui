import { IStoreRepository } from '../../repositories/IStoreRepository';

export class DeleteStoreUseCase {
  constructor(private storeRepository: IStoreRepository) {}

  async execute(id: string, tenantId: string): Promise<void> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new Error('Not Found: Store not found');
    }

    if (store.tenantId !== tenantId) {
      throw new Error('Forbidden: Store does not belong to this tenant');
    }

    // Soft delete
    store.deletedAt = new Date();
    store.updatedAt = new Date();
    store.active = false;

    await this.storeRepository.update(store);
  }
}
