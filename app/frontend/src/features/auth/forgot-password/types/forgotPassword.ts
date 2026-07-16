export type ForgotPasswordStep = 'request' | 'sent' | 'reset' | 'invalid-link'

export type ForgotPasswordRequestFormValues = {
  email: string
}

export type ForgotPasswordResetFormValues = {
  newPassword: string
  confirmPassword: string
}

export type ForgotPasswordRequestPayload = ForgotPasswordRequestFormValues

export type ForgotPasswordRequestResult = {
  message: string
}

export type ForgotPasswordResetPayload = ForgotPasswordResetFormValues

export type ForgotPasswordResetRequestPayload = {
  password: string
}

export type ForgotPasswordResetResult = {
  message: string
}
