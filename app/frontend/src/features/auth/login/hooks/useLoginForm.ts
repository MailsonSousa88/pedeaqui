import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ZodType } from 'zod'
import { loginSchema } from '../schemas/loginSchema'
import type { LoginFormValues } from '../types/login'

export function useLoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const {
    formState: { errors },
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

  const onSubmit = handleSubmit(() => undefined)

  function togglePasswordVisibility() {
    setIsPasswordVisible((isVisible) => !isVisible)
  }

  return {
    errors,
    isPasswordVisible,
    onSubmit,
    register,
    togglePasswordVisibility,
  }
}
