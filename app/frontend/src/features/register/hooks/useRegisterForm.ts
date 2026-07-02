import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../schemas/registerSchema'
import type { RegisterFormValues } from '../types/register'

export function useRegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      document: '',
    },
  })

  const onSubmit = form.handleSubmit(() => undefined)

  return {
    errors: form.formState.errors,
    onSubmit,
    register: form.register,
  }
}
