import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { getAuthSession } from '../../../../shared/services/authSession'
import { getStorefrontBySlug, updateStorefront } from '../services/storefrontService'
import type {
  StorefrontEditValues,
  StorefrontCopyLinkStatus,
  StorefrontLoadStatus,
  StorefrontStore,
} from '../types/storefront'

export function useStorefront(slug?: string) {
  const [store, setStore] = useState<StorefrontStore | null>(null)
  const [resolvedSlug, setResolvedSlug] = useState<string | null>(null)
  const [failedSlug, setFailedSlug] = useState<string | null>(null)
  const [editingStoreId, setEditingStoreId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [copyLinkStatus, setCopyLinkStatus] = useState<StorefrontCopyLinkStatus>('idle')
  const copyFeedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let isActive = true

    if (!slug) {
      return () => {
        isActive = false
      }
    }

    void getStorefrontBySlug(slug)
      .then((loadedStore) => {
        if (isActive) {
          setStore(loadedStore)
          setResolvedSlug(slug)
          setFailedSlug(null)
        }
      })
      .catch(() => {
        if (isActive) {
          setStore(null)
          setResolvedSlug(null)
          setFailedSlug(slug)
        }
      })

    return () => {
      isActive = false
    }
  }, [slug])

  const status: StorefrontLoadStatus = !slug
    ? 'missing'
    : failedSlug === slug
      ? 'error'
      : resolvedSlug === slug && store
        ? 'success'
        : 'loading'

  const visibleStore = status === 'success' ? store : null
  const canCopyPublicLink = Boolean(visibleStore?.slug.trim())

  useEffect(() => {
    return () => {
      if (copyFeedbackTimer.current) {
        clearTimeout(copyFeedbackTimer.current)
        copyFeedbackTimer.current = null
      }
    }
  }, [])

  const copyPublicLink = useCallback(async () => {
    const publicSlug = visibleStore?.slug.trim()

    if (!publicSlug) {
      return
    }

    if (copyFeedbackTimer.current) {
      clearTimeout(copyFeedbackTimer.current)
      copyFeedbackTimer.current = null
    }

    setCopyLinkStatus('idle')

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable')
      }

      const publicUrl = new URL(
        `/storefront/${encodeURIComponent(publicSlug)}`,
        window.location.origin,
      ).toString()

      await navigator.clipboard.writeText(publicUrl)
      setCopyLinkStatus('success')
      copyFeedbackTimer.current = setTimeout(() => {
        setCopyLinkStatus('idle')
        copyFeedbackTimer.current = null
      }, 2000)
    } catch {
      setCopyLinkStatus('error')
    }
  }, [visibleStore?.slug])

  const canEdit = useMemo(() => {
    const session = getAuthSession()
    return Boolean(visibleStore && session?.profile.id === visibleStore.tenantId)
  }, [visibleStore])

  const isEditing = Boolean(canEdit && visibleStore && editingStoreId === visibleStore.id)

  const startEditing = useCallback(() => {
    if (!canEdit) {
      return
    }

    setSaveError(null)
    setEditingStoreId(visibleStore?.id ?? null)
  }, [canEdit, visibleStore])

  const cancelEditing = useCallback(() => {
    setSaveError(null)
    setEditingStoreId(null)
  }, [])

  const saveStore = useCallback(
    async (values: StorefrontEditValues) => {
      const session = getAuthSession()

      if (!visibleStore || !session || session.profile.id !== visibleStore.tenantId) {
        setSaveError('Voce nao possui uma sessao valida para editar esta loja.')
        return false
      }

      setIsSaving(true)
      setSaveError(null)

      try {
        const updatedStore = await updateStorefront(
          visibleStore.id,
          {
            ...values,
            storeName: values.storeName.trim(),
            descricao: values.descricao.trim(),
            endereco: values.endereco.trim(),
            city: values.city.trim(),
            state: values.state.trim().toUpperCase(),
            whatsappNumber: values.whatsappNumber.replace(/\D/g, ''),
          },
          session.accessToken,
        )

        setStore(updatedStore)
        setResolvedSlug(updatedStore.slug)
        setEditingStoreId(null)
        return true
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : 'Nao foi possivel salvar a loja.')
        return false
      } finally {
        setIsSaving(false)
      }
    },
    [visibleStore],
  )

  return {
    store: visibleStore,
    status,
    canCopyPublicLink,
    copyLinkStatus,
    canEdit,
    isEditing,
    isSaving,
    saveError,
    startEditing,
    cancelEditing,
    copyPublicLink,
    saveStore,
  }
}
