export const PRODUCT_IMAGE_SLOT_LIMIT = 3

export type ProductImageSlot = 1 | 2 | 3

export type ProductCategoryKind = 'system' | 'custom'

export type ProductManagementFormMode = 'create' | 'edit'

export type ProductManagementPanelView = 'cards' | 'manage-products'

export type ProductAvailabilityFilter = 'all' | 'available' | 'unavailable'

export type ProductPromotionFilter = 'all' | 'promotion' | 'regular'

export type ProductManagementAsyncStatus = 'idle' | 'loading' | 'success' | 'error'

export type ProductManagementActionStatus = ProductManagementAsyncStatus

export type ProductManagementErrorCode =
  | 'plan_limit_reached'
  | 'foreign_product'
  | 'invalid_category'
  | 'removed_category'
  | 'network'
  | 'validation'
  | 'unknown'

export const PRODUCT_MANAGEMENT_ERROR_MESSAGES = {
  foreignProduct: 'Não foi possível alterar este produto porque ele pertence a outra loja.',
  invalidCategory:
    'Esta categoria não atende aos critérios da loja. Selecione uma categoria válida para continuar.',
  network: 'Não foi possível acessar o servidor agora. Verifique sua conexão e tente novamente.',
  planLimitReached:
    'Você atingiu o limite de produtos do seu plano. Remova produtos existentes ou revise seu plano antes de cadastrar novos itens.',
  removedCategory:
    'Esta categoria não pode mais ser utilizada porque foi removida. Escolha outra categoria.',
  unknown: 'Não foi possível concluir a ação agora. Tente novamente.',
  validation: 'Revise os dados do produto e tente novamente.',
} as const

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
  promotionEnabled: boolean
  promoPrice: string
  promoEndsAt: string
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
  storeId: string
  categoryId: string
  name: string
  description?: string
  priceCents: number
  promoPriceCents?: number
  promoEndsAt?: string
  details?: Record<string, unknown>
  available?: boolean
}

export type ProductManagementFilters = {
  availability: ProductAvailabilityFilter
  categoryId: string | null
  promotion: ProductPromotionFilter
  searchTerm: string
}

export type ManageProductListItem = {
  id: string
  storeId: string
  categoryId: string
  categoryLabel?: string | null
  name: string
  description?: string | null
  priceCents: number
  promoPriceCents?: number | null
  promoEndsAt?: string | null
  details?: Record<string, unknown> | null
  available: boolean
  createdAt?: string
  updatedAt?: string
}

export type ProductManagementApiProduct = ManageProductListItem

export type UpdateProductPayload = Partial<{
  categoryId: string
  name: string
  description: string | null
  priceCents: number
  promoPriceCents: number | null
  promoEndsAt: string | null
  details: Record<string, unknown>
}>

export type ProductManagementError = {
  code: ProductManagementErrorCode
  message: string
}

export type ProductManagementActionState = {
  error: ProductManagementError | null
  productId: string | null
  status: ProductManagementActionStatus
}

export type ProductManagementProductActionHandlers = {
  onEditProduct: (product: ManageProductListItem) => void
  onRemoveProduct: (product: ManageProductListItem) => void
  onToggleAvailability: (product: ManageProductListItem) => void
}

export type ProductManagementEditableFormValues = {
  categoryId: string | null
  description: string
  name: string
  price: string
  promotion: ProductPromotionFormValues
}

export type ProductManagementState = {
  action: ProductManagementActionState
  editingProduct: ManageProductListItem | null
  filters: ProductManagementFilters
  isAddProductModalOpen: boolean
  isDeleteConfirmationOpen: boolean
  isManageProductsPanelOpen: boolean
  listError: ProductManagementError | null
  listStatus: ProductManagementAsyncStatus
  products: ManageProductListItem[]
  activeImageSlot: ProductImageSlot
  selectedProductForDelete: ManageProductListItem | null
  storeId: string | null
  view: ProductManagementPanelView
}

export type ProductFormActionHandlers = {
  onCancel: () => void
  onSave: () => void
  saveLabel?: string
}
