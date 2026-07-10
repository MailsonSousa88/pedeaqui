import { ApiError, apiClient } from '../../../../shared/services/api'
import type { LoginFormValues, LoginPayload, LoginResponse } from '../types/login'

export interface LoginService {
  login(payload: LoginPayload): Promise<LoginResponse>
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
      } else {
        console.error('[loginService] Login API request failed', error)
      }

      throw new Error('Nao foi possivel entrar. Verifique seus dados e tente novamente.', {
        cause: error,
      })
    }
  },
}
