import { z } from 'zod'
import type { LoginFormValues } from '../types/login'

export const loginSchema: z.ZodType<LoginFormValues> = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'E-mail é obrigatório.')
    .email('Digite um e-mail válido.'),
  password: z.string().min(1, 'Senha é obrigatória.'),
})
