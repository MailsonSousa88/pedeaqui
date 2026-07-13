import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ZodType } from 'zod'
import { loginSchema } from '../schemas/loginSchema'
import { buildLoginPayload, loginService } from '../services/loginService'
import type { LoginFormValues, LoginResponse } from '../types/login'
import { clearAuthSession, saveAuthSession } from '../../../../shared/services/authSession'

type UseLoginFormOptions = {
  onSuccess?: (response: LoginResponse) => void
}

export function useLoginForm({ onSuccess }: UseLoginFormOptions = {}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(
      loginSchema as ZodType<LoginFormValues, LoginFormValues>,
    ),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setSubmissionError(null)

    try {
      clearAuthSession()
      const payload = buildLoginPayload(values)
      const response = await loginService.login(payload)
      saveAuthSession(response)
      onSuccess?.(response)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nao foi possivel entrar. Verifique seus dados e tente novamente.'
      setSubmissionError(message)
    }
  })

  function togglePasswordVisibility() {
    setIsPasswordVisible((isVisible) => !isVisible)
  }

  return {
    errors,
    isPasswordVisible,
    isSubmitting,
    onSubmit,
    register,
    submissionError,
    togglePasswordVisibility,
  }
}
