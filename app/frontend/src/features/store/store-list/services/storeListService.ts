import { apiClient } from '../../../../shared/services/api'
import type {
  LoadStoreList,
  PublicStoreListItemDto,
  StoreSummary,
} from '../types/storeList'

const toStoreSummary = (store: PublicStoreListItemDto): StoreSummary => ({
  id: store.slug,
  name: store.storeName,
  description: store.descricao ?? '',
  imageSrc: store.logoUrl ?? undefined,
  imageAlt: store.logoUrl ? `Logo da loja ${store.storeName}` : undefined,
  isSelectable: true,
})

export const loadStoreList: LoadStoreList = async () => {
  const stores = await apiClient.get<PublicStoreListItemDto[]>('/api/stores/public')

  return stores.map(toStoreSummary)
}
