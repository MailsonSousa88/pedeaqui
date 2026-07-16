import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { resetPasswordSchema } from '../schemas/forgotPasswordSchemas'
import { forgotPasswordService } from '../services/forgotPasswordService'
import type { ForgotPasswordResetFormValues } from '../types/forgotPassword'

type UseForgotPasswordResetFormParams = {
  accessToken: string
  onResetSuccess: () => void
}

export function useForgotPasswordResetForm({
  accessToken,
  onResetSuccess,
}: UseForgotPasswordResetFormParams) {
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ForgotPasswordResetFormValues>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  })

  const handleResetSubmit = form.handleSubmit(async (values) => {
    setSubmitError(undefined)
    setIsSubmitting(true)

    try {
      await forgotPasswordService.resetPassword(accessToken, {
        password: values.newPassword,
      })
      onResetSuccess()
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel redefinir sua senha. Tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  })

  function focusPasswordField(fieldName: keyof ForgotPasswordResetFormValues) {
    requestAnimationFrame(() => {
      form.setFocus(fieldName)
    })
  }

  function toggleNewPasswordVisibility() {
    setIsNewPasswordVisible((currentValue) => !currentValue)
    focusPasswordField('newPassword')
  }

  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible((currentValue) => !currentValue)
    focusPasswordField('confirmPassword')
  }

  return {
    form,
    handleResetSubmit,
    isSubmitting,
    isNewPasswordVisible,
    isConfirmPasswordVisible,
    submitError,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
  }
}
