import { z } from 'zod'

const timePattern = /^$|^([01]\d|2[0-3]):[0-5]\d$/
const onlyDigits = (value: string) => value.replace(/\D/g, '')

export const storefrontEditSchema = z
  .object({
    storeName: z.string().trim().min(1, 'Informe o nome da loja.'),
    descricao: z.string().trim().max(500, 'A descricao deve ter no maximo 500 caracteres.'),
    horarioAbertura: z.string().regex(timePattern, 'Informe um horario de abertura valido.'),
    horarioFechamento: z.string().regex(timePattern, 'Informe um horario de fechamento valido.'),
    endereco: z.string().trim().min(1, 'Informe o endereco da loja.'),
    city: z.string().trim().min(1, 'Informe a cidade da loja.'),
    state: z
      .string()
      .trim()
      .regex(/^[A-Z]{2}$/, 'Informe uma UF com duas letras. Ex.: SP.'),
    whatsappNumber: z.string().refine((value) => {
      const digits = onlyDigits(value)
      return digits.length >= 10 && digits.length <= 11
    }, 'Informe um WhatsApp valido com DDD.'),
  })
  .superRefine((values, context) => {
    if (!values.horarioAbertura && !values.horarioFechamento) {
      return
    }

    if (!values.horarioAbertura || !values.horarioFechamento) {
      context.addIssue({
        code: 'custom',
        path: values.horarioAbertura ? ['horarioFechamento'] : ['horarioAbertura'],
        message: 'Informe os dois horarios ou deixe ambos vazios.',
      })
      return
    }

    if (values.horarioFechamento <= values.horarioAbertura) {
      context.addIssue({
        code: 'custom',
        path: ['horarioFechamento'],
        message: 'O fechamento deve ser posterior a abertura.',
      })
    }
  })
