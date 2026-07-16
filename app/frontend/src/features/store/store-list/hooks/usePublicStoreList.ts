import { useCallback, useEffect, useState } from 'react'
import { loadStoreList } from '../services/storeListService'
import type { StoreListState } from '../types/storeList'

const LOAD_ERROR_MESSAGE = 'Verifique sua conexão e tente novamente.'

export function usePublicStoreList() {
  const [state, setState] = useState<StoreListState>({ status: 'loading' })
  const [requestVersion, setRequestVersion] = useState(0)

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setRequestVersion((currentVersion) => currentVersion + 1)
  }, [])

  useEffect(() => {
    let isCurrentRequest = true

    void loadStoreList()
      .then((stores) => {
        if (isCurrentRequest) {
          setState({ status: 'success', stores })
        }
      })
      .catch(() => {
        if (isCurrentRequest) {
          setState({ status: 'error', message: LOAD_ERROR_MESSAGE })
        }
      })

    return () => {
      isCurrentRequest = false
    }
  }, [requestVersion])

  return { state, retry }
}
