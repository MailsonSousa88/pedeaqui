import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../schemas/registerSchema'
import { buildRegisterPayload, registerService } from '../services/registerService'
import type { RegisterFormValues } from '../types/register'

type UseRegisterFormOptions = {
  onSuccess?: () => void
}

export function useRegisterForm({ onSuccess }: UseRegisterFormOptions = {}) {
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      document: '',
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmissionError(null)

    try {
      const payload = buildRegisterPayload(values)
      await registerService.register(payload)
      onSuccess?.()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nao foi possivel concluir o cadastro.'
      setSubmissionError(message)
    }
  })

  return {
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
    register: form.register,
    submissionError,
  }
}
