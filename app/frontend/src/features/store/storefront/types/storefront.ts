export type StorefrontTabKey = 'products' | 'add' | 'categories'

export type StorefrontTab = {
  key: StorefrontTabKey
  label: string
}

export type StorefrontInfoKey = 'businessHours' | 'address' | 'whatsapp'

export type StorefrontInfoItem = {
  key: StorefrontInfoKey
  label: string
  value?: string | null
}

export type ImagePlaceholderVariant = 'banner' | 'avatar' | 'product'

export type ImagePlaceholderTone = 'brand' | 'neutral'

export type StorefrontStore = {
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

export type StorefrontEditValues = {
  storeName: string
  descricao: string
  horarioAbertura: string
  horarioFechamento: string
  endereco: string
  city: string
  state: string
  whatsappNumber: string
}

export type StorefrontUpdatePayload = StorefrontEditValues

export type StorefrontLoadStatus = 'missing' | 'loading' | 'success' | 'error'

export type StorefrontCopyLinkStatus = 'idle' | 'success' | 'error'

export type StorefrontCatalogStatus = StorefrontLoadStatus

export type StorefrontCategory = {
  id: string
  name: string
}

export type StorefrontProduct = {
  id: string
  storeId: string
  categoryId: string
  categoryLabel?: string | null
  name: string
  description?: string | null
  priceCents: number
  promoPriceCents?: number | null
  promoEndsAt?: string | null
  available: boolean
}
