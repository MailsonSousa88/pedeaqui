import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { requestResetSchema } from '../schemas/forgotPasswordSchemas'
import type { ForgotPasswordRequestFormValues } from '../types/forgotPassword'

type UseForgotPasswordRequestFormParams = {
  onRequestSuccess: () => void
}

export function useForgotPasswordRequestForm({
  onRequestSuccess,
}: UseForgotPasswordRequestFormParams) {
  const form = useForm<ForgotPasswordRequestFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(requestResetSchema),
  })

  const handleRequestSubmit = form.handleSubmit(() => {
    onRequestSuccess()
  })

  return {
    form,
    handleRequestSubmit,
  }
}
