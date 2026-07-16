import { ApiError, apiClient } from '../../../../shared/services/api'
import { getAuthSession } from '../../../../shared/services/authSession'
import {
  clearPendingStorePreconfiguration,
  getPendingStorePreconfiguration,
} from '../../../store/store-preconfiguration/services/storePreconfigurationService'
import type { CreatedStore } from '../types/checkoutReview'

const CREATED_STORE_KEY = 'pedeaqui.created-store'
const DEFAULT_ACTIVATION_ERROR_MESSAGE =
  'Não foi possível criar sua loja. Verifique seus dados e tente novamente.'

const canUseSessionStorage = () => typeof window !== 'undefined' && Boolean(window.sessionStorage)

const getApiErrorMessage = (error: ApiError) => {
  if (typeof error.body === 'object' && error.body !== null && 'error' in error.body) {
    return String((error.body as { error: unknown }).error)
  }

  return null
}

const describeActivationError = (error: unknown) => {
  if (!(error instanceof ApiError)) {
    return DEFAULT_ACTIVATION_ERROR_MESSAGE
  }

  const apiMessage = getApiErrorMessage(error)

  if (error.status === 401) {
    return 'Sua sessao expirou. Entre novamente para criar sua loja.'
  }

  if (error.status === 403) {
    return 'Nao foi possivel validar o periodo gratuito da sua conta.'
  }

  if (apiMessage?.includes('Store with this slug already exists')) {
    return 'Este endereco de loja ja esta em uso. Volte ao pre-registro e escolha outro nome.'
  }

  if (apiMessage?.includes('Tenant already has a store')) {
    return 'Esta conta ja possui uma loja vinculada.'
  }

  if (apiMessage?.includes('stores_whatsapp_number_key')) {
    return 'Este número de WhatsApp já está vinculado a outra loja. Atualize o número do seu cadastro para continuar.'
  }

  if (apiMessage === 'Invalid document') {
    return 'O documento informado para o lojista nao e valido.'
  }

  return DEFAULT_ACTIVATION_ERROR_MESSAGE
}

const saveCreatedStore = (store: CreatedStore) => {
  if (canUseSessionStorage()) {
    window.sessionStorage.setItem(CREATED_STORE_KEY, JSON.stringify(store))
  }
}

export const getCreatedStore = (): CreatedStore | null => {
  if (!canUseSessionStorage()) {
    return null
  }

  const storedStore = window.sessionStorage.getItem(CREATED_STORE_KEY)

  if (!storedStore) {
    return null
  }

  try {
    return JSON.parse(storedStore) as CreatedStore
  } catch {
    window.sessionStorage.removeItem(CREATED_STORE_KEY)
    return null
  }
}

const finishActivation = (store: CreatedStore) => {
  saveCreatedStore(store)
  clearPendingStorePreconfiguration()
  return store
}

export async function activateTrialStore(): Promise<CreatedStore> {
  if (canUseSessionStorage()) {
    window.sessionStorage.removeItem(CREATED_STORE_KEY)
  }

  const session = getAuthSession()
  const pendingPayload = getPendingStorePreconfiguration()

  if (!session) {
    throw new Error('Sua sessao nao foi encontrada. Entre novamente para continuar.')
  }

  if (!pendingPayload) {
    throw new Error('Os dados do pre-registro nao foram encontrados. Preencha o formulario novamente.')
  }

  const document = pendingPayload.tenant.document || session.profile.document

  if (!document) {
    throw new Error('Nao foi possivel identificar o documento do lojista.')
  }

  const requestOptions = { authToken: session.accessToken }
  const whatsappNumber = session.profile.phone.replace(/\D/g, '')

  if (whatsappNumber.length < 10 || whatsappNumber.length > 11) {
    throw new Error(
      'O WhatsApp informado no cadastro não é válido. Atualize seu cadastro para continuar.',
    )
  }

  try {
    await apiClient.post('/api/tenants', { document }, requestOptions)
  } catch (error) {
    const isExistingTenant =
      error instanceof ApiError &&
      error.status === 409 &&
      getApiErrorMessage(error) === 'Tenant already exists'

    if (!isExistingTenant) {
      throw new Error(describeActivationError(error), { cause: error })
    }
  }

  try {
    const store = await apiClient.post<CreatedStore>(
      '/api/stores',
      {
        ...pendingPayload.store,
        whatsappNumber,
      },
      requestOptions,
    )

    return finishActivation(store)
  } catch (error) {
    const isStoreConflict = error instanceof ApiError && error.status === 409

    if (isStoreConflict) {
      try {
        const existingStore = await apiClient.get<CreatedStore>(
          `/api/stores/${encodeURIComponent(pendingPayload.store.slug)}`,
        )

        if (existingStore.tenantId === session.profile.id) {
          return finishActivation(existingStore)
        }
      } catch {
        // The original conflict below is more useful than a failed recovery lookup.
      }
    }

    throw new Error(describeActivationError(error), { cause: error })
  }
}
