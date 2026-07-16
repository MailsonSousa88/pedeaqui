export type PublicStoreDto = {
  id: string
  slug: string
  storeName: string
  active: boolean
  whatsappNumber?: string
}

export type PublicProductDto = {
  id: string
  storeId: string
  categoryId: string
  name: string
  description?: string | null
  priceCents: number
  promoPriceCents?: number | null
  promoEndsAt?: string | null
  details?: Record<string, unknown> | null
  available: boolean
}

export type PublicCategoryDto = {
  id: string
  name: string
}

export type ProductPublicDetail = {
  key: string
  label: string
  value: string
}

export type ProductDetailViewModel = {
  id: string
  storeId: string
  storeName: string
  storeSlug: string
  name: string
  description: string | null
  categoryName: string | null
  priceCents: number
  promoPriceCents: number | null
  available: boolean
  details: ProductPublicDetail[]
  whatsappNumber?: string
}

export type ProductDetailUnavailableReason = 'store' | 'product'

export type ProductDetailState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'unavailable'; reason: ProductDetailUnavailableReason }
  | { status: 'success'; product: ProductDetailViewModel }
