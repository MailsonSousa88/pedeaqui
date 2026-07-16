import type {
  StorePreconfigurationPayload,
  StorePreconfigurationResult,
} from '../types/storePreconfiguration'

export type SubmitStorePreconfiguration = (
  payload: StorePreconfigurationPayload,
) => Promise<StorePreconfigurationResult>

const PENDING_STORE_KEY = 'pedeaqui.pending-store-preconfiguration'

const canUseSessionStorage = () => typeof window !== 'undefined' && Boolean(window.sessionStorage)

export const getPendingStorePreconfiguration = (): StorePreconfigurationPayload | null => {
  if (!canUseSessionStorage()) {
    return null
  }

  const storedPayload = window.sessionStorage.getItem(PENDING_STORE_KEY)

  if (!storedPayload) {
    return null
  }

  try {
    return JSON.parse(storedPayload) as StorePreconfigurationPayload
  } catch {
    window.sessionStorage.removeItem(PENDING_STORE_KEY)
    return null
  }
}

export const clearPendingStorePreconfiguration = () => {
  if (canUseSessionStorage()) {
    window.sessionStorage.removeItem(PENDING_STORE_KEY)
  }
}

export const submitStorePreconfiguration: SubmitStorePreconfiguration = async (payload) => {
  if (!canUseSessionStorage()) {
    return {
      ok: false,
      message: 'Nao foi possivel preparar os dados da loja neste navegador.',
    }
  }

  window.sessionStorage.setItem(PENDING_STORE_KEY, JSON.stringify(payload))

  return {
    ok: true,
    payload,
  }
}
