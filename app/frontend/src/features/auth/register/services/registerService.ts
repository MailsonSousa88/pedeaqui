import { getCpfDigits } from '../utils/documentNormalize'
import { getPhoneDigits } from '../utils/phoneNormalize'
import type {
  RegisterFormValues,
  RegisterPayload,
  RegisterResponse,
} from '../types/register'

type ApiErrorResponse = {
  error?: string
}

export interface RegisterService {
  register(payload: RegisterPayload): Promise<RegisterResponse>
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
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = (await response.json().catch(() => ({}))) as RegisterResponse & ApiErrorResponse

    if (!response.ok) {
      throw new Error(data.error || 'Nao foi possivel concluir o cadastro.')
    }

    return data
  },
}
