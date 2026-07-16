export type StoreSummary = {
  id: string
  name: string
  description: string
  imageSrc?: string
  imageAlt?: string
  isSelectable: boolean
}

export type PublicStoreListItemDto = {
  id: string
  tenantId: string
  slug: string
  storeName: string
  horarioAbertura: string
  horarioFechamento: string
  endereco: string
  city: string
  state: string
  descricao: string | null
  logoUrl: string | null
  whatsappNumber: string
  active: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
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

export type LoadStoreList = () => Promise<readonly StoreSummary[]>
