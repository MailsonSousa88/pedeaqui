import { z } from 'zod'

export const requestResetSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Informe o e-mail.')
    .email('Informe um e-mail valido.'),
})

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'Informe a nova senha.')
      .min(8, 'A senha deve ter no minimo 8 caracteres.'),
    confirmPassword: z.string().min(1, 'Confirme a nova senha.'),
  })
  .refine((values) => values.confirmPassword === values.newPassword, {
    message: 'As senhas informadas devem ser iguais.',
    path: ['confirmPassword'],
  })
