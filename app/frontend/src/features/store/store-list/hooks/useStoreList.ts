import { useCallback, useMemo, useState } from 'react'

import type { StoreSummary } from '../types/storeList'

type UseStoreListOptions = {
  stores: readonly StoreSummary[]
  onSearchChange?: (term: string) => void
}

function normalizeSearchValue(value: string) {
  return value.trim().toLocaleLowerCase('pt-BR')
}

export function useStoreList({ stores, onSearchChange }: UseStoreListOptions) {
  const [searchTerm, setSearchTerm] = useState('')

  const normalizedSearchTerm = normalizeSearchValue(searchTerm)

  const visibleStores = useMemo(() => {
    if (!normalizedSearchTerm) {
      return stores
    }

    return stores.filter((store) =>
      normalizeSearchValue(store.name).startsWith(normalizedSearchTerm),
    )
  }, [normalizedSearchTerm, stores])

  const handleSearchChange = useCallback(
    (term: string) => {
      setSearchTerm(term)
      onSearchChange?.(term)
    },
    [onSearchChange],
  )

  const clearSearch = useCallback(() => {
    handleSearchChange('')
  }, [handleSearchChange])

  return {
    searchTerm,
    visibleStores,
    isSearchEmpty: normalizedSearchTerm.length > 0 && visibleStores.length === 0,
    handleSearchChange,
    clearSearch,
  }
}
