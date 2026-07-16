import { IStoreRepository } from '../../repositories/IStoreRepository';
import { Store } from '../../models/Store';

export class GetStoreBySlugUseCase {
  constructor(private storeRepository: IStoreRepository) {}

  async execute(slug: string): Promise<Store> {
    const store = await this.storeRepository.findBySlug(slug);

    if (!store) {
      throw new Error('Not Found: Store not found');
    }

    // Dynamic active state calculation based on opening hours
    // Only if the store isn't manually deactivated
    if (store.active && store.horarioAbertura && store.horarioFechamento) {
      const now = new Date();
      // Assume local time for now, or preferably use a specific timezone
      const currentHours = now.getHours().toString().padStart(2, '0');
      const currentMinutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${currentHours}:${currentMinutes}`;

      if (currentTime < store.horarioAbertura || currentTime > store.horarioFechamento) {
        // Return a modified instance to not save it to DB, just for the response
        const storeResponse = new Store({...store});
        storeResponse.active = false;
        return storeResponse;
      }
    }

    return store;
  }
}
