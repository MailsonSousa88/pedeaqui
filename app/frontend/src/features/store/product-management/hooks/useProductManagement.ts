import { useCallback, useMemo, useState } from 'react'

import {
  deleteProduct,
  listProductsByStore,
  mapProductManagementError,
  toggleProductAvailability,
  updateProduct,
} from '../services/productManagementService'
import {
  PRODUCT_MANAGEMENT_ERROR_MESSAGES,
  type ManageProductListItem,
  type ProductAvailabilityFilter,
  type ProductImageSlot,
  type ProductManagementActionState,
  type ProductManagementAsyncStatus,
  type ProductManagementEditableFormValues,
  type ProductManagementError,
  type ProductManagementFilters,
  type ProductPromotionFilter,
  type ProductStockMode,
  type UpdateProductPayload,
} from '../types/productManagement'

const firstImageSlot: ProductImageSlot = 1
const lastImageSlot: ProductImageSlot = 3

const initialFilters: ProductManagementFilters = {
  availability: 'all',
  categoryId: null,
  promotion: 'all',
  searchTerm: '',
}

const initialActionState: ProductManagementActionState = {
  error: null,
  productId: null,
  status: 'idle',
}

type UseProductManagementOptions = {
  storeId?: string | null
}

const filterByAvailability = (
  product: ManageProductListItem,
  availability: ProductAvailabilityFilter,
) => {
  if (availability === 'available') {
    return product.available
  }

  if (availability === 'unavailable') {
    return !product.available
  }

  return true
}

const filterByPromotion = (product: ManageProductListItem, promotion: ProductPromotionFilter) => {
  const hasPromotion = Boolean(product.promoPriceCents)

  if (promotion === 'promotion') {
    return hasPromotion
  }

  if (promotion === 'regular') {
    return !hasPromotion
  }

  return true
}

const filterBySearchTerm = (product: ManageProductListItem, searchTerm: string) => {
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase('pt-BR')

  if (!normalizedSearchTerm) {
    return true
  }

  return product.name.toLocaleLowerCase('pt-BR').includes(normalizedSearchTerm)
}

const createStoreIdMissingError = (): ProductManagementError => ({
  code: 'unknown',
  message: 'Conecte uma loja antes de gerenciar produtos.',
})

const createUpdatePayloadFromProduct = (
  product: ManageProductListItem,
): UpdateProductPayload => ({
  categoryId: product.categoryId,
  description: product.description ?? null,
  details: product.details ?? undefined,
  name: product.name,
  priceCents: product.priceCents,
  promoEndsAt: product.promoEndsAt ?? null,
  promoPriceCents: product.promoPriceCents ?? null,
})

const currencyInputToCents = (value: string) => {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return 0
  }

  return Number(digits)
}

const normalizePromoEndsAt = (value: string) => {
  if (!value) {
    return null
  }

  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return null
  }

  return parsedDate.toISOString()
}

const createUpdatePayloadFromFormValues = (
  values: ProductManagementEditableFormValues,
  currentProduct: ManageProductListItem,
): UpdateProductPayload => {
  const priceCents = currencyInputToCents(values.price)
  const promoPriceCents = currencyInputToCents(values.promotion.promoPrice)

  return {
    categoryId: values.categoryId ?? currentProduct.categoryId,
    description: values.description.trim() || null,
    details: currentProduct.details ?? undefined,
    name: values.name.trim() || currentProduct.name,
    priceCents: priceCents > 0 ? priceCents : currentProduct.priceCents,
    promoEndsAt: values.promotion.promotionEnabled
      ? normalizePromoEndsAt(values.promotion.promoEndsAt)
      : null,
    promoPriceCents:
      values.promotion.promotionEnabled && promoPriceCents > 0 ? promoPriceCents : null,
  }
}

export function useProductManagement(options: UseProductManagementOptions = {}) {
  const storeId = options.storeId ?? null
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
  const [isManageProductsPanelOpen, setIsManageProductsPanelOpen] = useState(false)
  const [activeImageSlot, setActiveImageSlot] = useState<ProductImageSlot>(firstImageSlot)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isPromotionEnabled, setIsPromotionEnabled] = useState(false)
  const [stockMode, setStockMode] = useState<ProductStockMode>('free')
  const [products, setProducts] = useState<ManageProductListItem[]>([])
  const [filters, setFilters] = useState<ProductManagementFilters>(initialFilters)
  const [listStatus, setListStatus] = useState<ProductManagementAsyncStatus>('idle')
  const [listError, setListError] = useState<ProductManagementError | null>(null)
  const [action, setAction] = useState<ProductManagementActionState>(initialActionState)
  const [editingProduct, setEditingProduct] = useState<ManageProductListItem | null>(null)
  const [selectedProductForDelete, setSelectedProductForDelete] =
    useState<ManageProductListItem | null>(null)

  const openAddProductModal = useCallback(() => {
    setEditingProduct(null)
    setIsAddProductModalOpen(true)
  }, [])

  const closeAddProductModal = useCallback(() => {
    setIsAddProductModalOpen(false)
  }, [])

  const openManageProductsPanel = useCallback(() => {
    setIsManageProductsPanelOpen(true)
  }, [])

  const closeManageProductsPanel = useCallback(() => {
    setIsManageProductsPanelOpen(false)
  }, [])

  const goToNextImageSlot = useCallback(() => {
    setActiveImageSlot((currentSlot) =>
      currentSlot === lastImageSlot ? firstImageSlot : ((currentSlot + 1) as ProductImageSlot),
    )
  }, [])

  const goToPreviousImageSlot = useCallback(() => {
    setActiveImageSlot((currentSlot) =>
      currentSlot === firstImageSlot ? lastImageSlot : ((currentSlot - 1) as ProductImageSlot),
    )
  }, [])

  const toggleFeatured = useCallback(() => {
    setIsFeatured((currentValue) => {
      const nextValue = !currentValue

      if (!nextValue) {
        setIsPromotionEnabled(false)
      }

      return nextValue
    })
  }, [])

  const togglePromotion = useCallback(() => {
    setIsPromotionEnabled((currentValue) => (isFeatured ? !currentValue : false))
  }, [isFeatured])

  const setSearchTerm = useCallback((searchTerm: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      searchTerm,
    }))
  }, [])

  const setAvailabilityFilter = useCallback((availability: ProductAvailabilityFilter) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      availability,
    }))
  }, [])

  const setCategoryFilter = useCallback((categoryId: string | null) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      categoryId,
    }))
  }, [])

  const setPromotionFilter = useCallback((promotion: ProductPromotionFilter) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      promotion,
    }))
  }, [])

  const resetProductFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [])

  const loadProducts = useCallback(async () => {
    if (!storeId) {
      setProducts([])
      setListStatus('error')
      setListError(createStoreIdMissingError())
      return
    }

    setListStatus('loading')
    setListError(null)

    try {
      const loadedProducts = await listProductsByStore(storeId)
      setProducts(loadedProducts)
      setListStatus('success')
    } catch (error) {
      setListStatus('error')
      setListError(mapProductManagementError(error))
    }
  }, [storeId])

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          filterBySearchTerm(product, filters.searchTerm) &&
          filterByAvailability(product, filters.availability) &&
          filterByPromotion(product, filters.promotion) &&
          (!filters.categoryId || product.categoryId === filters.categoryId),
      ),
    [filters, products],
  )

  const openEditProductModal = useCallback((product: ManageProductListItem) => {
    setEditingProduct(product)
    setIsAddProductModalOpen(true)
  }, [])

  const closeEditProductModal = useCallback(() => {
    setEditingProduct(null)
    setIsAddProductModalOpen(false)
  }, [])

  const openDeleteConfirmation = useCallback((product: ManageProductListItem) => {
    setSelectedProductForDelete(product)
    setIsDeleteConfirmationOpen(true)
  }, [])

  const closeDeleteConfirmation = useCallback(() => {
    setSelectedProductForDelete(null)
    setIsDeleteConfirmationOpen(false)
  }, [])

  const prepareAvailabilityToggle = useCallback((product: ManageProductListItem) => {
    setAction({
      error: null,
      productId: product.id,
      status: 'idle',
    })
  }, [])

  const clearProductAction = useCallback(() => {
    setAction(initialActionState)
  }, [])

  const setProductActionError = useCallback((error: ProductManagementError) => {
    setAction((currentAction) => ({
      ...currentAction,
      error,
      status: 'error',
    }))
  }, [])

  const setProductActionLoading = useCallback((productId: string) => {
    setAction({
      error: null,
      productId,
      status: 'loading',
    })
  }, [])

  const setProductActionSuccess = useCallback((productId: string) => {
    setAction({
      error: null,
      productId,
      status: 'success',
    })
  }, [])

  const saveEditingProduct = useCallback(async (values?: ProductManagementEditableFormValues) => {
    if (!editingProduct) {
      return
    }

    setProductActionLoading(editingProduct.id)

    try {
      const updatedProduct = await updateProduct(
        editingProduct.id,
        values
          ? createUpdatePayloadFromFormValues(values, editingProduct)
          : createUpdatePayloadFromProduct(editingProduct),
      )

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        ),
      )
      setProductActionSuccess(updatedProduct.id)
      setEditingProduct(null)
      setIsAddProductModalOpen(false)
    } catch (error) {
      setProductActionError(mapProductManagementError(error))
    }
  }, [editingProduct, setProductActionError, setProductActionLoading, setProductActionSuccess])

  const handleToggleProductAvailability = useCallback(
    async (product: ManageProductListItem) => {
      setProductActionLoading(product.id)

      try {
        const updatedProduct = await toggleProductAvailability(product.id)

        setProducts((currentProducts) =>
          currentProducts.map((currentProduct) =>
            currentProduct.id === updatedProduct.id ? updatedProduct : currentProduct,
          ),
        )
        setProductActionSuccess(updatedProduct.id)
      } catch (error) {
        setProductActionError(mapProductManagementError(error))
      }
    },
    [setProductActionError, setProductActionLoading, setProductActionSuccess],
  )

  const confirmDeleteProduct = useCallback(async () => {
    if (!selectedProductForDelete) {
      return
    }

    setProductActionLoading(selectedProductForDelete.id)

    try {
      await deleteProduct(selectedProductForDelete.id)

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== selectedProductForDelete.id),
      )
      setProductActionSuccess(selectedProductForDelete.id)
      setSelectedProductForDelete(null)
      setIsDeleteConfirmationOpen(false)
    } catch (error) {
      setProductActionError(mapProductManagementError(error))
    }
  }, [
    selectedProductForDelete,
    setProductActionError,
    setProductActionLoading,
    setProductActionSuccess,
  ])

  const hasStoreId = Boolean(storeId)
  const emptyProductsMessage = hasStoreId
    ? 'Nenhum produto encontrado para os filtros selecionados.'
    : PRODUCT_MANAGEMENT_ERROR_MESSAGES.unknown

  return {
    action,
    activeImageSlot,
    closeAddProductModal,
    closeDeleteConfirmation,
    closeEditProductModal,
    closeManageProductsPanel,
    confirmDeleteProduct,
    editingProduct,
    emptyProductsMessage,
    filteredProducts,
    filters,
    goToNextImageSlot,
    goToPreviousImageSlot,
    hasStoreId,
    isAddProductModalOpen,
    isDeleteConfirmationOpen,
    isFeatured,
    isManageProductsPanelOpen,
    isPromotionEnabled,
    listError,
    listStatus,
    loadProducts,
    openDeleteConfirmation,
    openAddProductModal,
    openEditProductModal,
    openManageProductsPanel,
    prepareAvailabilityToggle,
    products,
    resetProductFilters,
    saveEditingProduct,
    selectedProductForDelete,
    setAvailabilityFilter,
    setCategoryFilter,
    setProductActionError,
    setProductActionLoading,
    setProductActionSuccess,
    setSearchTerm,
    setPromotionFilter,
    setStockMode,
    stockMode,
    storeId,
    clearProductAction,
    handleToggleProductAvailability,
    toggleFeatured,
    togglePromotion,
  }
}
