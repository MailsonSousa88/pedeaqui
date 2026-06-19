// feature/store/schemas/storeSetupSchema.ts
import { z } from "zod";

export const storeSetupSchema = z.object({
  state: z.string().trim().min(1, "Informe o estado da loja."),
  city: z.string().trim().min(1, "Informe a cidade da loja."),
  district: z.string().trim().min(1, "Informe o bairro da loja."),
  street: z.string().trim().min(1, "Informe a rua da loja."),
  number: z.string().trim().min(1, "Informe o número do estabelecimento."),
  storeName: z.string().trim().min(1, "Informe o nome da loja."),
  whatsapp: z
    .string()
    .trim()
    .min(1, "Informe o WhatsApp da loja.")
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Informe um WhatsApp válido."),
  email: z
    .string()
    .trim()
    .min(1, "Informe o e-mail de contato.")
    .email("Informe um e-mail válido."),
  startDay: z.string().min(1, "Selecione o primeiro dia de funcionamento."),
  endDay: z.string().min(1, "Selecione o último dia de funcionamento."),
  openAt: z.string().min(1, "Selecione o horário de abertura."),
  closeAt: z.string().min(1, "Selecione o horário de fechamento."),
});

export type StoreSetupFormData = z.infer<typeof storeSetupSchema>;
