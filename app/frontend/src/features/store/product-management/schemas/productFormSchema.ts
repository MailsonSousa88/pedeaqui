import { z } from 'zod'

const requiredText = (message: string) => z.string().trim().min(1, message)

const optionalText = z.string().trim().optional()

const currencyStringToCents = (value: string) => {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return 0
  }

  return Number(digits)
}

const isPositiveCurrency = (value: string) => currencyStringToCents(value) > 0

const productPromotionSchema = z.object({
  promotionEnabled: z.boolean(),
  promoEndsAt: z.string().trim(),
  promoPrice: z.string().trim(),
})

export const productFormSchema = z
  .object({
    categoryId: z
      .string()
      .nullable()
      .refine((value) => Boolean(value?.trim()), 'Selecione uma categoria válida.'),
    description: optionalText,
    name: requiredText('Informe o nome do produto.'),
    price: z.string().trim().refine(isPositiveCurrency, 'Informe um preço maior que zero.'),
    promotion: productPromotionSchema,
  })
  .superRefine((values, context) => {
    const basePriceCents = currencyStringToCents(values.price)
    const promoPriceCents = currencyStringToCents(values.promotion.promoPrice)
    const hasPromoPrice = promoPriceCents > 0
    const hasPromoEndsAt = values.promotion.promoEndsAt.length > 0

    if (values.promotion.promotionEnabled && !hasPromoPrice) {
      context.addIssue({
        code: 'custom',
        message: 'Informe um preço promocional maior que zero.',
        path: ['promotion', 'promoPrice'],
      })
    }

    if (hasPromoPrice && promoPriceCents >= basePriceCents) {
      context.addIssue({
        code: 'custom',
        message: 'O preço promocional deve ser menor que o preço base.',
        path: ['promotion', 'promoPrice'],
      })
    }

    if (hasPromoEndsAt && !hasPromoPrice) {
      context.addIssue({
        code: 'custom',
        message: 'Informe um preço promocional antes de definir o fim da promoção.',
        path: ['promotion', 'promoEndsAt'],
      })
    }

    if (!values.promotion.promotionEnabled && (hasPromoPrice || hasPromoEndsAt)) {
      context.addIssue({
        code: 'custom',
        message: 'Ative a promoção antes de preencher preço ou fim da promoção.',
        path: ['promotion', 'promotionEnabled'],
      })
    }
  })

export type ProductFormSchemaValues = z.infer<typeof productFormSchema>
