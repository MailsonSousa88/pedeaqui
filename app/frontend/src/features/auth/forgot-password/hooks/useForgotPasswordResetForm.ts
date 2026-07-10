import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { resetPasswordSchema } from '../schemas/forgotPasswordSchemas'
import type { ForgotPasswordResetFormValues } from '../types/forgotPassword'

export function useForgotPasswordResetForm() {
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const form = useForm<ForgotPasswordResetFormValues>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  })

  const handleResetSubmit = form.handleSubmit(() => undefined)

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
    isNewPasswordVisible,
    isConfirmPasswordVisible,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
  }
}
