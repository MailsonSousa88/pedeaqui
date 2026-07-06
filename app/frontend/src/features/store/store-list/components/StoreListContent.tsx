import type { StoreListCallbacks, StoreListState } from '../types/storeList'
import { StoreList } from './StoreList'
import { StoreListFeedback } from './StoreListFeedback'

type StoreListContentProps = {
  state: StoreListState
  onSelectStore: StoreListCallbacks['onSelectStore']
  onClearSearch: () => void
  onRetry?: StoreListCallbacks['onRetry']
}

export function StoreListContent({
  state,
  onSelectStore,
  onClearSearch,
  onRetry,
}: StoreListContentProps) {
  if (state.status === 'success') {
    return (
      <div>
        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {state.stores.length} {state.stores.length === 1 ? 'loja encontrada' : 'lojas encontradas'}
        </p>
        <StoreList stores={state.stores} onSelectStore={onSelectStore} />
      </div>
    )
  }

  return (
    <StoreListFeedback
      state={state}
      onClearSearch={onClearSearch}
      onRetry={onRetry}
    />
  )
}
