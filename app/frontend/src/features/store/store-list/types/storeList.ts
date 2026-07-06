export type StoreSummary = {
  id: string
  name: string
  description: string
  imageSrc?: string
  imageAlt?: string
  isSelectable: boolean
}

export type StoreListEmptyReason = 'list' | 'search'

export type StoreListState =
  | { status: 'initial' }
  | { status: 'loading' }
  | { status: 'success'; stores: readonly StoreSummary[] }
  | { status: 'empty'; reason: StoreListEmptyReason }
  | { status: 'error'; message: string }

export type StoreListAvailability = {
  isExploreAvailable: boolean
}

export type StoreListCallbacks = {
  onSearchChange: (term: string) => void
  onExplore: () => void
  onSelectStore: (storeId: StoreSummary['id']) => void
  onRetry?: () => void
}

export type StoreListServiceResult =
  | { status: 'unavailable' }
  | { status: 'notImplemented' }

export type LoadStoreList = () => Promise<StoreListServiceResult>
