export type PlanId = 'basic'

export type CheckoutFlowStatus = 'idle' | 'loading' | 'error' | 'ready'

export type PaymentMethodId = 'pix' | 'credit-card'

export type PaymentMethod = {
  id: PaymentMethodId
  title: string
  description: string
}

export type Benefit = {
  id: string
  label: string
}

export type PlanSummary = {
  id: PlanId
  name: string
  priceLabel: string
  billingLabel: string
  benefits: Benefit[]
}

export type CreatedStore = {
  id: string
  tenantId: string
  slug: string
  storeName: string
  horarioAbertura: string | null
  horarioFechamento: string | null
  endereco: string
  city: string
  state: string
  descricao: string | null
  logoUrl: string | null
  whatsappNumber: string
  active: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
}

export const CHECKOUT_REDIRECT_UNAVAILABLE_MESSAGE =
  'Nao foi possivel criar sua loja. Tente novamente.'

export const BASIC_PLAN: PlanSummary = {
  id: 'basic',
  name: 'Plano Basico',
  priceLabel: '30 dias gratis',
  billingLabel: 'Periodo de teste sem cobranca',
  benefits: [
    { id: 'store', label: 'Criar loja no PedeAqui' },
    { id: 'products', label: 'Cadastrar produtos' },
    { id: 'orders', label: 'Receber pedidos dos clientes' },
    { id: 'management', label: 'Gerenciar pedidos recebidos' },
  ],
}

export const ACCEPTED_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pix',
    title: 'PIX',
    description: 'Pagamento instantaneo',
  },
  {
    id: 'credit-card',
    title: 'Cartao de credito',
    description: 'Visa, Mastercard, Elo, e mais',
  },
]
