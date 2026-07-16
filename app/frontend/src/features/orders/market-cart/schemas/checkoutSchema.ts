import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(3, { message: "O nome completo deve conter pelo menos 3 caracteres." }),
  paymentMethod: z.string().min(1, { message: "Selecione um método de pagamento." }),
  addressStreet: z.string().min(1, { message: "A rua/avenida é obrigatória." }),
  addressNumber: z.string()
    .min(1, { message: "O número é obrigatório." })
    .refine((val) => !isNaN(Number(val)), { message: "O número precisa ser um valor numérico." })
    .transform((val) => Number(val))
    .refine((num) => Number.isInteger(num) && num > 0, { message: "O número deve ser um número inteiro positivo." }),
  addressNeighborhood: z.string().min(1, { message: "O bairro é obrigatório." }),
  addressReference: z.string().optional(),
  addressCity: z.string().min(1, { message: "A cidade é obrigatória." }),
  addressState: z.string()
    .min(1, { message: "O estado é obrigatório." })
    .length(2, { message: "Use a sigla com 2 letras (ex: PI)." }),
  orderObservation: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
