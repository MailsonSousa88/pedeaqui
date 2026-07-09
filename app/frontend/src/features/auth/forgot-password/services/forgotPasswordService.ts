import type {
  ForgotPasswordRequestPayload,
  ForgotPasswordResetPayload,
} from '../types/forgotPassword'

export interface ForgotPasswordService {
  requestResetLink(payload: ForgotPasswordRequestPayload): Promise<void>
  resendResetLink(payload: ForgotPasswordRequestPayload): Promise<void>
  resetPassword(payload: ForgotPasswordResetPayload): Promise<void>
}

// TODO: implementar somente apos contrato oficial de backend e autorizacao explicita de escopo.
