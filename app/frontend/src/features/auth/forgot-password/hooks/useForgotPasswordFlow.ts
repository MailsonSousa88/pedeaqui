import { useState } from 'react'

import type { ForgotPasswordStep } from '../types/forgotPassword'

export function useForgotPasswordFlow() {
  const [currentStep, setCurrentStep] =
    useState<ForgotPasswordStep>('request')

  function goToEmailSent() {
    setCurrentStep('sent')
  }

  function simulateResetLinkOpening() {
    setCurrentStep('reset')
  }

  return {
    currentStep,
    goToEmailSent,
    simulateResetLinkOpening,
  }
}
