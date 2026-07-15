import { ApiError, ApiNetworkError, apiClient } from '../../../../shared/services/api'
import type {
  ForgotPasswordRequestPayload,
  ForgotPasswordRequestResult,
  ForgotPasswordResetPayload,
} from '../types/forgotPassword'

export interface ForgotPasswordService {
  requestResetLink(payload: ForgotPasswordRequestPayload): Promise<ForgotPasswordRequestResult>
  resendResetLink(payload: ForgotPasswordRequestPayload): Promise<ForgotPasswordRequestResult>
  resetPassword(payload: ForgotPasswordResetPayload): Promise<void>
}

const getRequestErrorText = (error: unknown) => {
  if (error instanceof ApiError) {
    console.error('[forgotPasswordService] Recover password API rejected the request', {
      status: error.status,
      response: error.body,
      url: error.url,
    })

    return 'Nao foi possivel enviar o link de recuperacao. Verifique o e-mail e tente novamente.'
  }

  if (error instanceof ApiNetworkError) {
    console.error('[forgotPasswordService] Recover password API request failed', error)

    return 'Nao foi possivel conectar ao servico. Verifique sua conexao e tente novamente.'
  }

  console.error('[forgotPasswordService] Recover password request failed', error)

  return 'Nao foi possivel enviar o link de recuperacao. Tente novamente.'
}

export const forgotPasswordService: ForgotPasswordService = {
  async requestResetLink(payload) {
    try {
      return await apiClient.post<ForgotPasswordRequestResult>('/api/auth/recover-password', {
        email: payload.email.trim(),
      })
    } catch (error) {
      throw new Error(getRequestErrorText(error), {
        cause: error,
      })
    }
  },
  async resendResetLink(payload) {
    return forgotPasswordService.requestResetLink(payload)
  },
  async resetPassword() {
    return undefined
  },
}

// TODO: implementar somente apos contrato oficial de backend e autorizacao explicita de escopo.
