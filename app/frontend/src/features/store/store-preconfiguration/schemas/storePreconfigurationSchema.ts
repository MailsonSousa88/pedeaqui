import { z } from 'zod'

import type { Weekday } from '../types/storePreconfiguration'

export const weekdays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const satisfies readonly Weekday[]

export const weekdayOptions = [
  { value: 'monday', label: 'Segunda-feira' },
  { value: 'tuesday', label: 'Terca-feira' },
  { value: 'wednesday', label: 'Quarta-feira' },
  { value: 'thursday', label: 'Quinta-feira' },
  { value: 'friday', label: 'Sexta-feira' },
  { value: 'saturday', label: 'Sabado' },
  { value: 'sunday', label: 'Domingo' },
] as const satisfies readonly { value: Weekday; label: string }[]

const weekdayOrder = new Map<Weekday, number>(
  weekdays.map((weekday, index) => [weekday, index]),
)

const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/
const brazilianWhatsappPattern = /^\(\d{2}\) 9\d{4}-\d{4}$/

const requiredText = (fieldName: string) =>
  z.string().trim().min(1, `${fieldName} é obrigatório.`)

const timeToMinutes = (time: string) => {
  const [hours = '0', minutes = '0'] = time.split(':')

  return Number(hours) * 60 + Number(minutes)
}

const weekdaySchema = z.enum(weekdays)

const requiredWeekdaySchema = z
  .union([weekdaySchema, z.literal('')])
  .refine((value) => value !== '', {
    message: 'Selecione um dia da semana.',
  })

const businessHoursSchema = z
  .object({
    startDay: requiredWeekdaySchema,
    endDay: requiredWeekdaySchema,
    opensAt: requiredText('Horário de abertura').regex(
      timePattern,
      'Informe a abertura no formato HH:mm.',
    ),
    closesAt: requiredText('Horário de fechamento').regex(
      timePattern,
      'Informe o fechamento no formato HH:mm.',
    ),
  })
  .superRefine((businessHours, context) => {
    const startDayIndex = weekdayOrder.get(businessHours.startDay)
    const endDayIndex = weekdayOrder.get(businessHours.endDay)

    if (startDayIndex !== undefined && endDayIndex !== undefined && endDayIndex < startDayIndex) {
      context.addIssue({
        code: 'custom',
        path: ['endDay'],
        message: 'O dia final deve ser igual ou posterior ao dia inicial.',
      })
    }

    if (!timePattern.test(businessHours.opensAt) || !timePattern.test(businessHours.closesAt)) {
      return
    }

    if (timeToMinutes(businessHours.closesAt) <= timeToMinutes(businessHours.opensAt)) {
      context.addIssue({
        code: 'custom',
        path: ['closesAt'],
        message:
          'O horário de fechamento deve ser posterior ao horário de abertura. Atendimento atravessando meia-noite não é aceito no MVP.',
      })
    }
  })

export const identityStepSchema = z.object({
  storeName: requiredText('Nome da loja'),
  contactEmail: requiredText('E-mail de contato').email('Informe um e-mail válido.'),
  whatsapp: requiredText('Número de WhatsApp').regex(
    brazilianWhatsappPattern,
    'Informe um WhatsApp brasileiro no formato (11) 91234-5678.',
  ),
  businessHours: businessHoursSchema,
})

export const addressStepSchema = z.object({
  address: z.object({
    state: requiredText('Estado').regex(/^[A-Z]{2}$/, 'Informe o estado com duas letras. Ex.: SP.'),
    city: requiredText('Cidade'),
    neighborhood: requiredText('Bairro'),
    street: requiredText('Rua'),
    number: requiredText('Número residencial ou comercial'),
  }),
})

export const storePreconfigurationFormSchema = identityStepSchema.merge(addressStepSchema)

export const storePreconfigurationPayloadSchema = z.object({
  storeName: requiredText('Nome da loja'),
  contactEmail: requiredText('E-mail de contato').email('Informe um e-mail válido.'),
  whatsapp: requiredText('Número de WhatsApp').regex(
    brazilianWhatsappPattern,
    'Informe um WhatsApp brasileiro no formato (11) 91234-5678.',
  ),
  businessHours: z
    .object({
      startDay: weekdaySchema,
      endDay: weekdaySchema,
      opensAt: requiredText('Horário de abertura').regex(
        timePattern,
        'Informe a abertura no formato HH:mm.',
      ),
      closesAt: requiredText('Horário de fechamento').regex(
        timePattern,
        'Informe o fechamento no formato HH:mm.',
      ),
    })
    .superRefine((businessHours, context) => {
      const startDayIndex = weekdayOrder.get(businessHours.startDay)
      const endDayIndex = weekdayOrder.get(businessHours.endDay)

      if (startDayIndex !== undefined && endDayIndex !== undefined && endDayIndex < startDayIndex) {
        context.addIssue({
          code: 'custom',
          path: ['endDay'],
          message: 'O dia final deve ser igual ou posterior ao dia inicial.',
        })
      }

      if (timeToMinutes(businessHours.closesAt) <= timeToMinutes(businessHours.opensAt)) {
        context.addIssue({
          code: 'custom',
          path: ['closesAt'],
          message:
            'O horário de fechamento deve ser posterior ao horário de abertura. Atendimento atravessando meia-noite não é aceito no MVP.',
        })
      }
    }),
  address: addressStepSchema.shape.address,
})

export type StorePreconfigurationFormSchema = z.infer<typeof storePreconfigurationFormSchema>
export type StorePreconfigurationPayloadSchema = z.infer<typeof storePreconfigurationPayloadSchema>
