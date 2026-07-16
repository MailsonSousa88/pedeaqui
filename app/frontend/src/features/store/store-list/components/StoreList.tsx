import type { StoreListCallbacks, StoreSummary } from '../types/storeList'
import { StoreCard } from './StoreCard'

type StoreListProps = {
  stores: readonly StoreSummary[]
  onSelectStore: StoreListCallbacks['onSelectStore']
}

export function StoreList({ stores, onSelectStore }: StoreListProps) {
  return (
    <ul className="flex list-none flex-col gap-3 p-0" aria-label="Lojas disponíveis">
      {stores.map((store) => (
        <li key={store.id}>
          <StoreCard store={store} onSelectStore={onSelectStore} />
        </li>
      ))}
    </ul>
  )
}
