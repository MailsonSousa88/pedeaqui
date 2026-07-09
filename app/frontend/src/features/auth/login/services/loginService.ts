import type { LoginFormValues, LoginPayload, LoginResponse } from '../types/login'

type ApiErrorResponse = {
  error?: string
}

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
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = (await response.json().catch(() => ({}))) as LoginResponse & ApiErrorResponse

    if (!response.ok) {
      throw new Error(data.error || 'Nao foi possivel entrar.')
    }

    return data
  },
}
