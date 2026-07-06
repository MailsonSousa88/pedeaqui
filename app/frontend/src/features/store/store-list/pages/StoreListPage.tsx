import { StoreListContent } from '../components/StoreListContent'
import { StoreListHeader } from '../components/StoreListHeader'
import { StoreSearchField } from '../components/StoreSearchField'
import { useStoreList } from '../hooks/useStoreList'
import type {
  StoreListCallbacks,
  StoreListState,
  StoreSummary,
} from '../types/storeList'

const EMPTY_STORES: readonly StoreSummary[] = []

type StoreListPageProps = Omit<StoreListCallbacks, 'onExplore'> & {
    state: StoreListState
  }

function resolveContentState(
  state: StoreListState,
  visibleStores: readonly StoreSummary[],
  isSearchEmpty: boolean,
): StoreListState {
  if (state.status !== 'success') {
    return state
  }

  if (state.stores.length === 0) {
    return { status: 'empty', reason: 'list' }
  }

  if (isSearchEmpty) {
    return { status: 'empty', reason: 'search' }
  }

  return { status: 'success', stores: visibleStores }
}

export function StoreListPage({
  state,
  onSearchChange,
  onSelectStore,
  onRetry,
}: StoreListPageProps) {
  const sourceStores = state.status === 'success' ? state.stores : EMPTY_STORES
  const {
    searchTerm,
    visibleStores,
    isSearchEmpty,
    handleSearchChange,
    clearSearch,
  } = useStoreList({ stores: sourceStores, onSearchChange })

  const contentState = resolveContentState(state, visibleStores, isSearchEmpty)

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <StoreListHeader />

      <main className="mx-auto w-full max-w-4xl px-4 pb-12 pt-7 sm:px-6 sm:pt-9 lg:px-8">
        <section aria-labelledby="store-list-title">
          <div>
            <h1 id="store-list-title" className="text-3xl font-bold tracking-tight">
              Lojas
            </h1>
            <p className="mt-1.5 text-sm text-[#6b7280]">
              Encontre lojas perto de você.
            </p>
          </div>

          <div className="mt-5">
            <StoreSearchField
              value={searchTerm}
              onSearchChange={handleSearchChange}
            />
          </div>

          <div
            className="mt-5"
            aria-busy={contentState.status === 'loading'}
          >
            <StoreListContent
              state={contentState}
              onSelectStore={onSelectStore}
              onClearSearch={clearSearch}
              onRetry={onRetry}
            />
          </div>
        </section>
      </main>
    </div>
  )
}
