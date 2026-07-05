export const PRODUCT_IMAGE_SLOT_LIMIT = 3

export type ProductImageSlot = 1 | 2 | 3

export type ProductStockMode = 'free' | 'controlled'

export type ProductCategoryKind = 'system' | 'custom'

export type ProductCategoryOption = {
  id: string
  label: string
  kind: ProductCategoryKind
  removable: boolean
}

export type ProductImagePlaceholder = {
  slot: ProductImageSlot
  label: string
}

export type ProductPromotionFormValues = {
  featured: boolean
  promotionEnabled: boolean
  promoPrice: string
  promoEndsAt: string
}

export type ProductStockFormValues = {
  mode: ProductStockMode
  initialQuantity: string
}

export type ProductVariationOptionFormValues = {
  value: string
  priceModifier: string
}

export type ProductVariationFormValues = {
  label: string
  options: ProductVariationOptionFormValues[]
}

export type AddProductFormValues = {
  name: string
  description: string
  price: string
  available: boolean
  categoryId: string | null
  newCategoryName: string
  imageSlots: typeof PRODUCT_IMAGE_SLOT_LIMIT
  activeImageSlot: ProductImageSlot
  promotion: ProductPromotionFormValues
  stock: ProductStockFormValues
  variations: ProductVariationFormValues[]
}

export type ProductVariationOptionInput = {
  value: string
  priceModifierCents?: number
}

export type ProductVariationInput = {
  label: string
  options: ProductVariationOptionInput[]
}

export type AddProductPayload = {
  name: string
  description?: string
  priceCents: number
  categoryId?: string | null
  available: boolean
  featured: boolean
  promotionEnabled: boolean
  promoPriceCents?: number
  promoEndsAt?: string
  stockMode: ProductStockMode
  initialStockQuantity?: number
  imageSlots: typeof PRODUCT_IMAGE_SLOT_LIMIT
  variations: ProductVariationInput[]
}

export type ProductManagementState = {
  isAddProductModalOpen: boolean
  activeImageSlot: ProductImageSlot
}

export type ProductFormActionHandlers = {
  onCancel: () => void
  onSave: () => void
}
