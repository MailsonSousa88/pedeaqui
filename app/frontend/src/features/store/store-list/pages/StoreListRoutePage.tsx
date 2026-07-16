import { usePublicStoreList } from '../hooks/usePublicStoreList'
import type { StoreListCallbacks } from '../types/storeList'
import { StoreListPage } from './StoreListPage'

type StoreListRoutePageProps = {
  onSelectStore: StoreListCallbacks['onSelectStore']
}

const ignoreSearchChange = () => undefined

export function StoreListRoutePage({ onSelectStore }: StoreListRoutePageProps) {
  const { state, retry } = usePublicStoreList()

  return (
    <StoreListPage
      state={state}
      onSearchChange={ignoreSearchChange}
      onSelectStore={onSelectStore}
      onRetry={retry}
    />
  )
}
