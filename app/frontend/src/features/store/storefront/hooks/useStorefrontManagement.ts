import { useCallback, useMemo, useState } from 'react'

import { getAuthSession } from '../../../../shared/services/authSession'
import { updateStorefront } from '../services/storefrontService'
import type { StorefrontEditValues } from '../types/storefront'
import { useStorefront } from './useStorefront'

export function useStorefrontManagement(slug?: string) {
  const storefront = useStorefront(slug)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const session = getAuthSession()
  const canManage = useMemo(
    () => Boolean(storefront.store && session?.profile.id === storefront.store.tenantId),
    [session?.profile.id, storefront.store],
  )

  const startEditing = useCallback(() => {
    if (!canManage) {
      return
    }

    setSaveError(null)
    setIsEditing(true)
  }, [canManage])

  const cancelEditing = useCallback(() => {
    setSaveError(null)
    setIsEditing(false)
  }, [])

  const saveStore = useCallback(
    async (values: StorefrontEditValues) => {
      const activeSession = getAuthSession()
      const store = storefront.store

      if (!store || !activeSession || activeSession.profile.id !== store.tenantId) {
        setSaveError('Você não possui uma sessão válida para editar esta loja.')
        return false
      }

      setIsSaving(true)
      setSaveError(null)

      try {
        await updateStorefront(
          store.id,
          {
            ...values,
            storeName: values.storeName.trim(),
            descricao: values.descricao.trim(),
            endereco: values.endereco.trim(),
            city: values.city.trim(),
            state: values.state.trim().toUpperCase(),
            whatsappNumber: values.whatsappNumber.replace(/\D/g, ''),
          },
          activeSession.accessToken,
        )
        setIsEditing(false)
        storefront.retry()
        return true
      } catch (error) {
        setSaveError(
          error instanceof Error ? error.message : 'Não foi possível salvar a loja.',
        )
        return false
      } finally {
        setIsSaving(false)
      }
    },
    [storefront],
  )

  return {
    ...storefront,
    canManage,
    cancelEditing,
    isEditing: canManage && isEditing,
    isSaving,
    saveError,
    saveStore,
    startEditing,
  }
}
