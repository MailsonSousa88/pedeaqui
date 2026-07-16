import { ApiError, apiClient } from '../../../../shared/services/api'
import type {
  LoginFormValues,
  LoginPayload,
  LoginResolvedStore,
  LoginResponse,
} from '../types/login'

export interface LoginService {
  findStoreForTenant(tenantId: string): Promise<LoginResolvedStore>
  login(payload: LoginPayload): Promise<LoginResponse>
}

const getApiErrorText = (error: ApiError) => {
  if (error.status === 401) {
    return 'E-mail ou senha invalidos.'
  }

  if (typeof error.body === 'object' && error.body !== null && 'error' in error.body) {
    const apiError = String((error.body as { error: unknown }).error)

    if (apiError === 'Invalid login credentials') {
      return 'E-mail ou senha invalidos.'
    }

    if (apiError === 'Email not confirmed') {
      return 'Confirme seu e-mail antes de entrar.'
    }
  }

  return 'Nao foi possivel entrar. Verifique seus dados e tente novamente.'
}

export function buildLoginPayload(values: LoginFormValues): LoginPayload {
  return {
    email: values.email.trim(),
    password: values.password,
  }
}

export const loginService: LoginService = {
  async findStoreForTenant(tenantId) {
    try {
      const stores = await apiClient.get<LoginResolvedStore[]>('/api/stores/public')
      const store = stores.find((candidate) => candidate.tenantId === tenantId)

      if (!store) {
        throw new Error(
          'Sua conta foi autenticada, mas nenhuma loja ativa foi encontrada para este perfil.',
        )
      }

      return store
    } catch (error) {
      if (
        error instanceof Error &&
        error.message ===
          'Sua conta foi autenticada, mas nenhuma loja ativa foi encontrada para este perfil.'
      ) {
        throw error
      }

      throw new Error('Não foi possível carregar sua loja agora. Tente entrar novamente.', {
        cause: error,
      })
    }
  },
  async login(payload) {
    try {
      return await apiClient.post<LoginResponse>('/api/auth/login', payload)
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('[loginService] Login API rejected the request', {
          status: error.status,
          response: error.body,
          url: error.url,
        })

        throw new Error(getApiErrorText(error), {
          cause: error,
        })
      } else {
        console.error('[loginService] Login API request failed', error)
      }

      throw new Error('Nao foi possivel entrar. Verifique seus dados e tente novamente.', {
        cause: error,
      })
    }
  },
}
