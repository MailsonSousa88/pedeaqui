import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ZodType } from 'zod'
import { loginSchema } from '../schemas/loginSchema'
import { buildLoginPayload, loginService } from '../services/loginService'
import type {
  LoginFormValues,
  LoginResolvedStore,
  LoginSubmissionStage,
} from '../types/login'
import { clearAuthSession, saveAuthSession } from '../../../../shared/services/authSession'

type UseLoginFormOptions = {
  onSuccess?: (store: LoginResolvedStore) => void
}

export function useLoginForm({ onSuccess }: UseLoginFormOptions = {}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [submissionStage, setSubmissionStage] = useState<LoginSubmissionStage>('idle')
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
      setSubmissionStage('authenticating')
      const payload = buildLoginPayload(values)
      const response = await loginService.login(payload)
      setSubmissionStage('resolving-store')
      const store = await loginService.findStoreForTenant(response.profile.id)
      saveAuthSession(response)
      onSuccess?.(store)
    } catch (error) {
      clearAuthSession()
      const message = error instanceof Error ? error.message : 'Nao foi possivel entrar. Verifique seus dados e tente novamente.'
      setSubmissionError(message)
      setSubmissionStage('idle')
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
    submissionStage,
    togglePasswordVisibility,
  }
}
