export type ForgotPasswordStep = 'request' | 'sent' | 'reset'

export type ForgotPasswordRequestFormValues = {
  email: string
}

export type ForgotPasswordResetFormValues = {
  newPassword: string
  confirmPassword: string
}

export type ForgotPasswordRequestPayload = ForgotPasswordRequestFormValues

export type ForgotPasswordResetPayload = ForgotPasswordResetFormValues
