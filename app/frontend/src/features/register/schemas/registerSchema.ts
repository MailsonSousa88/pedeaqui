import { z } from 'zod'
import type { RegisterFormValues } from '../types/register'

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, 'Informe seu nome completo.'),
  email: z
    .string()
    .trim()
    .min(1, 'Informe seu e-mail.')
    .email('Informe um e-mail válido.'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
  document: z.string().trim().min(1, 'Informe seu CPF ou CNPJ.'),
}) satisfies z.ZodType<RegisterFormValues>
