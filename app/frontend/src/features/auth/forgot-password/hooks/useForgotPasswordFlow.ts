import { useState } from 'react'

import { forgotPasswordService } from '../services/forgotPasswordService'
import type { ForgotPasswordStep } from '../types/forgotPassword'

export function useForgotPasswordFlow() {
  const [currentStep, setCurrentStep] =
    useState<ForgotPasswordStep>('request')
  const [lastEmail, setLastEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [requestError, setRequestError] = useState<string | undefined>(undefined)
  const [resendError, setResendError] = useState<string | undefined>(undefined)
  const [resendSuccessMessage, setResendSuccessMessage] = useState<string | undefined>(undefined)

  function goToEmailSent() {
    setCurrentStep('sent')
  }

  async function submitRecoveryRequest(email: string) {
    const normalizedEmail = email.trim()

    setRequestError(undefined)
    setResendError(undefined)
    setResendSuccessMessage(undefined)
    setIsSubmitting(true)

    try {
      await forgotPasswordService.requestResetLink({ email: normalizedEmail })
      setLastEmail(normalizedEmail)
      goToEmailSent()
    } catch (error) {
      setRequestError(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel enviar o link de recuperacao. Tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function resendRecoveryRequest() {
    if (!lastEmail) {
      setResendError('Nao foi possivel reenviar o link sem um e-mail valido.')
      return
    }

    setResendError(undefined)
    setResendSuccessMessage(undefined)
    setIsResending(true)

    try {
      await forgotPasswordService.resendResetLink({ email: lastEmail })
      setResendSuccessMessage('Link reenviado para o e-mail informado.')
    } catch (error) {
      setResendError(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel reenviar o link. Tente novamente.',
      )
    } finally {
      setIsResending(false)
    }
  }

  return {
    currentStep,
    goToEmailSent,
    isSubmitting,
    isResending,
    lastEmail,
    requestError,
    resendError,
    resendSuccessMessage,
    resendRecoveryRequest,
    submitRecoveryRequest,
  }
}
