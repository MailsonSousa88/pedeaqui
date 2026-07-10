import { ApiError, apiClient } from '../../../../shared/services/api'
import type { LoginFormValues, LoginPayload, LoginResponse } from '../types/login'

export interface LoginService {
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
