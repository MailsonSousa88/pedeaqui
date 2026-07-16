import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { requestResetSchema } from '../schemas/forgotPasswordSchemas'
import type { ForgotPasswordRequestFormValues } from '../types/forgotPassword'

type UseForgotPasswordRequestFormParams = {
  onRequestSubmit: (email: string) => Promise<void>
}

export function useForgotPasswordRequestForm({
  onRequestSubmit,
}: UseForgotPasswordRequestFormParams) {
  const form = useForm<ForgotPasswordRequestFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(requestResetSchema),
  })

  const handleRequestSubmit = form.handleSubmit(async (values) => {
    await onRequestSubmit(values.email)
  })

  return {
    form,
    handleRequestSubmit,
  }
}
