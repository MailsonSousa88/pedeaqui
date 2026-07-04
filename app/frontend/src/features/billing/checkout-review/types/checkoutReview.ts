export type PlanId = "basic";

export type CheckoutFlowStatus =
  | "idle"
  | "loading"
  | "error"
  | "ready";

export type PaymentMethodId = "pix" | "credit-card";

export type Benefit = {
  id: string;
  label: string;
};

export type PaymentMethod = {
  id: PaymentMethodId;
  title: string;
  description: string;
};

export type PlanSummary = {
  id: PlanId;
  name: string;
  priceLabel: string;
  billingLabel: string;
  benefits: Benefit[];
};

export type CheckoutSessionRequest = {
  planId: PlanId;
  onboardingContextId?: string;
};

export type CheckoutSessionResult =
  | {
      status: "ready";
      checkoutUrl: string;
      expiresAt?: string;
    }
  | {
      status: "unavailable";
      code: "CHECKOUT_SESSION_UNAVAILABLE";
      message: string;
    };

export type CheckoutReviewState = {
  selectedPlan: PlanSummary | null;
  status: CheckoutFlowStatus;
  errorMessage: string | null;
};

export const CHECKOUT_REDIRECT_UNAVAILABLE_MESSAGE =
  "Não foi possível realizar o redirecionamento para a plataforma de pagamento";

export const BASIC_PLAN: PlanSummary = {
  id: "basic",
  name: "Plano Básico",
  priceLabel: "R$ 29,99/mês",
  billingLabel: "Cobrança mensal",
  benefits: [
    { id: "store", label: "Criar loja no PedeAqui" },
    { id: "products", label: "Cadastrar produtos" },
    { id: "orders", label: "Receber pedidos dos clientes" },
    { id: "management", label: "Gerenciar pedidos recebidos" },
  ],
};

export const ACCEPTED_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pix",
    title: "PIX",
    description: "Pagamento instantâneo",
  },
  {
    id: "credit-card",
    title: "Cartão de crédito",
    description: "Visa, Mastercard, Elo, e mais",
  },
];
