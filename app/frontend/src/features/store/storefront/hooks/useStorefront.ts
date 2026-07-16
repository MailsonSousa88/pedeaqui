import { useCallback, useEffect, useRef, useState } from 'react'

import {
  getStorefrontBySlug,
  isStorefrontNotFoundError,
} from '../services/storefrontService'
import type {
  StorefrontCopyLinkStatus,
  StorefrontLoadStatus,
  StorefrontStore,
} from '../types/storefront'

type StorefrontRequestResult = {
  requestKey: string
  status: Extract<StorefrontLoadStatus, 'success' | 'unavailable' | 'error'>
  store: StorefrontStore | null
}

const isShareCancellation = (error: unknown) =>
  error instanceof DOMException && error.name === 'AbortError'

export function useStorefront(slug?: string) {
  const normalizedSlug = slug?.trim() ?? ''
  const [requestRevision, setRequestRevision] = useState(0)
  const [requestResult, setRequestResult] = useState<StorefrontRequestResult | null>(null)
  const [copyLinkStatus, setCopyLinkStatus] = useState<StorefrontCopyLinkStatus>('idle')
  const copyFeedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const requestKey = normalizedSlug ? `${normalizedSlug}:${requestRevision}` : null

  useEffect(() => {
    let isActive = true

    if (!requestKey) {
      return () => {
        isActive = false
      }
    }

    void getStorefrontBySlug(normalizedSlug)
      .then((loadedStore) => {
        if (!isActive) {
          return
        }

        setRequestResult({ requestKey, status: 'success', store: loadedStore })
      })
      .catch((error: unknown) => {
        if (!isActive) {
          return
        }

        setRequestResult({
          requestKey,
          status: isStorefrontNotFoundError(error) ? 'unavailable' : 'error',
          store: null,
        })
      })

    return () => {
      isActive = false
    }
  }, [normalizedSlug, requestKey])

  useEffect(() => {
    return () => {
      if (copyFeedbackTimer.current) {
        clearTimeout(copyFeedbackTimer.current)
      }
    }
  }, [])

  const status: StorefrontLoadStatus = !requestKey
    ? 'missing'
    : requestResult?.requestKey === requestKey
      ? requestResult.status
      : 'loading'
  const store = status === 'success' ? requestResult?.store ?? null : null
  const canSharePublicLink = Boolean(store?.slug.trim())

  const resetShareFeedback = useCallback(() => {
    if (copyFeedbackTimer.current) {
      clearTimeout(copyFeedbackTimer.current)
      copyFeedbackTimer.current = null
    }

    setCopyLinkStatus('idle')
  }, [])

  const showTemporaryShareSuccess = useCallback(() => {
    setCopyLinkStatus('success')
    copyFeedbackTimer.current = setTimeout(() => {
      setCopyLinkStatus('idle')
      copyFeedbackTimer.current = null
    }, 2000)
  }, [])

  const sharePublicLink = useCallback(async () => {
    const visibleStore = store
    const publicSlug = visibleStore?.slug.trim()

    if (!publicSlug || !visibleStore) {
      return
    }

    resetShareFeedback()
    const publicUrl = new URL(
      `/storefront/${encodeURIComponent(publicSlug)}`,
      window.location.origin,
    ).toString()

    if (navigator.share) {
      try {
        await navigator.share({
          text: visibleStore.descricao ?? undefined,
          title: visibleStore.storeName,
          url: publicUrl,
        })
        showTemporaryShareSuccess()
        return
      } catch (error) {
        if (isShareCancellation(error)) {
          return
        }
      }
    }

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable')
      }

      await navigator.clipboard.writeText(publicUrl)
      showTemporaryShareSuccess()
    } catch {
      setCopyLinkStatus('error')
    }
  }, [resetShareFeedback, showTemporaryShareSuccess, store])

  const retry = useCallback(() => {
    setRequestRevision((currentRevision) => currentRevision + 1)
  }, [])

  return {
    canSharePublicLink,
    copyLinkStatus,
    retry,
    sharePublicLink,
    status,
    store,
  }
}
