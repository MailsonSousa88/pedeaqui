import { ApiError, apiClient } from '../../../../shared/services/api'
import type { StorefrontStore, StorefrontUpdatePayload } from '../types/storefront'

const getApiMessage = (error: ApiError) => {
  if (typeof error.body === 'object' && error.body !== null && 'error' in error.body) {
    return String((error.body as { error: unknown }).error)
  }

  return null
}

export const getStorefrontBySlug = (slug: string) =>
  apiClient.get<StorefrontStore>(`/api/stores/${encodeURIComponent(slug)}`)

export const updateStorefront = async (
  storeId: string,
  payload: StorefrontUpdatePayload,
  authToken: string,
) => {
  try {
    return await apiClient.put<StorefrontStore>(`/api/stores/${storeId}`, payload, {
      authToken,
    })
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        throw new Error('Sua sessao expirou. Entre novamente para editar a loja.', { cause: error })
      }

      if (error.status === 403) {
        throw new Error('Voce nao possui permissao para editar esta loja.', { cause: error })
      }

      throw new Error(getApiMessage(error) || 'Nao foi possivel salvar as alteracoes.', {
        cause: error,
      })
    }

    throw new Error('Nao foi possivel salvar as alteracoes.', { cause: error })
  }
}
