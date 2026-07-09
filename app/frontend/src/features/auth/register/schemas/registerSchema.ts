import { z } from 'zod'
import type { RegisterFormValues } from '../types/register'
import { CPF_DIGIT_LENGTH, getCpfDigits } from '../utils/documentNormalize'
import { WHATSAPP_DIGIT_LENGTH, getPhoneDigits } from '../utils/phoneNormalize'

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, 'Informe seu nome completo.'),
  email: z
    .string()
    .trim()
    .min(1, 'Informe seu e-mail.')
    .email('Informe um e-mail valido.'),
  phone: z
    .string()
    .trim()
    .refine((value) => getPhoneDigits(value).length === WHATSAPP_DIGIT_LENGTH, {
      message: 'Informe um WhatsApp com DDD e 10 digitos.',
    }),
  password: z.string().min(8, 'A senha deve ter no minimo 8 caracteres.'),
  document: z
    .string()
    .trim()
    .refine((value) => getCpfDigits(value).length === CPF_DIGIT_LENGTH, {
      message: 'Informe um CPF com 11 digitos.',
    }),
}) satisfies z.ZodType<RegisterFormValues>
