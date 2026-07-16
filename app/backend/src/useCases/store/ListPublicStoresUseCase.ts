import { Store } from '../../models/Store';

export interface IPublicStoreRepository {
  findPublic(): Promise<Store[]>;
}

export class ListPublicStoresUseCase {
  constructor(private storeRepository: IPublicStoreRepository) {}

  async execute(): Promise<Store[]> {
    return this.storeRepository.findPublic();
  }
}
