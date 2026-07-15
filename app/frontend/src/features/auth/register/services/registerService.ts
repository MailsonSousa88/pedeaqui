import { ApiError, apiClient } from '../../../../shared/services/api'
import { getCpfDigits } from '../utils/documentNormalize'
import { getPhoneDigits } from '../utils/phoneNormalize'
import type {
  RegisterFormValues,
  RegisterPayload,
  RegisterResponse,
} from '../types/register'
import {
  clearAuthSession,
  saveAuthSession,
  type AuthSession,
} from '../../../../shared/services/authSession'

export interface RegisterService {
  register(payload: RegisterPayload): Promise<RegisterResponse>
}

const getApiErrorText = (body: unknown) => {
  if (typeof body === 'object' && body !== null && 'error' in body) {
    const error = String((body as { error: unknown }).error)

    if (error === 'Invalid CPF') {
      return 'Informe um CPF valido.'
    }

    if (error === 'CPF already registered') {
      return 'Este CPF ja esta cadastrado. Entre na sua conta ou use outro CPF.'
    }

    if (error === 'Missing required fields') {
      return 'Preencha todos os campos obrigatorios.'
    }
  }

  return 'Nao foi possivel concluir o cadastro. Revise os dados e tente novamente.'
}

export function buildRegisterPayload(values: RegisterFormValues): RegisterPayload {
  return {
    email: values.email.trim(),
    password: values.password,
    name: values.fullName.trim(),
    phone: getPhoneDigits(values.phone),
    document: getCpfDigits(values.document),
  }
}

export const registerService: RegisterService = {
  async register(payload) {
    clearAuthSession()

    let registration: RegisterResponse

    try {
      registration = await apiClient.post<RegisterResponse>('/api/auth/signup', payload)
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('[registerService] Signup API rejected the request', {
          status: error.status,
          response: error.body,
          url: error.url,
        })

        throw new Error(getApiErrorText(error.body), {
          cause: error,
        })
      }

      console.error('[registerService] Signup API request failed', error)
      throw new Error('Nao foi possivel concluir o cadastro. Revise os dados e tente novamente.', {
        cause: error,
      })
    }

    try {
      const session = await apiClient.post<AuthSession>('/api/auth/login', {
        email: payload.email,
        password: payload.password,
      })

      saveAuthSession(session)
      return registration
    } catch (error) {
      console.error('[registerService] Automatic login failed after signup', error)
      throw new Error('Cadastro concluido, mas nao foi possivel iniciar sua sessao. Entre com seu e-mail e senha.', {
        cause: error,
      })
    }
  },
}
