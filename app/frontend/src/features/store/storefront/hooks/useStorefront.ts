import { useCallback, useEffect, useMemo, useState } from 'react'

import { getAuthSession } from '../../../../shared/services/authSession'
import { getStorefrontBySlug, updateStorefront } from '../services/storefrontService'
import type {
  StorefrontEditValues,
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
    canEdit,
    isEditing,
    isSaving,
    saveError,
    startEditing,
    cancelEditing,
    saveStore,
  }
}
