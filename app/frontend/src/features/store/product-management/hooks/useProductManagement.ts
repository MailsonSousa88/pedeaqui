import { useCallback, useMemo, useState } from 'react'

import { getAuthSession } from '../../../../shared/services/authSession'
import { productFormSchema } from '../schemas/productFormSchema'
import {
  createCategory,
  createProduct,
  deleteProduct,
  listCategoriesByStore,
  listProductsByStore,
  mapProductManagementError,
  toggleProductAvailability,
  updateProduct,
} from '../services/productManagementService'
import {
  PRODUCT_MANAGEMENT_ERROR_MESSAGES,
  type ManageProductListItem,
  type ProductCategoryOption,
  type ProductAvailabilityFilter,
  type ProductManagementActionState,
  type ProductManagementAsyncStatus,
  type ProductManagementEditableFormValues,
  type ProductManagementError,
  type ProductManagementFilters,
  type ProductPromotionFilter,
  type UpdateProductPayload,
} from '../types/productManagement'

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
  onProductsChanged?: () => void
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

const mapCategoryToOption = (category: {
  id: string
  name: string
}): ProductCategoryOption => ({
  id: category.id,
  kind: category.name.trim().toLocaleLowerCase('pt-BR') === 'todos' ? 'system' : 'custom',
  label: category.name,
  removable: category.name.trim().toLocaleLowerCase('pt-BR') !== 'todos',
})

export function useProductManagement(options: UseProductManagementOptions = {}) {
  const onProductsChanged = options.onProductsChanged
  const storeId = options.storeId ?? null
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
  const [isManageProductsPanelOpen, setIsManageProductsPanelOpen] = useState(false)
  const [isPromotionEnabled, setIsPromotionEnabled] = useState(false)
  const [products, setProducts] = useState<ManageProductListItem[]>([])
  const [filters, setFilters] = useState<ProductManagementFilters>(initialFilters)
  const [listStatus, setListStatus] = useState<ProductManagementAsyncStatus>('idle')
  const [listError, setListError] = useState<ProductManagementError | null>(null)
  const [action, setAction] = useState<ProductManagementActionState>(initialActionState)
  const [editingProduct, setEditingProduct] = useState<ManageProductListItem | null>(null)
  const [selectedProductForDelete, setSelectedProductForDelete] =
    useState<ManageProductListItem | null>(null)
  const [categories, setCategories] = useState<ProductCategoryOption[]>([])
  const [categoryStatus, setCategoryStatus] = useState<ProductManagementAsyncStatus>('idle')
  const [categoryError, setCategoryError] = useState<string | null>(null)
  const [isSavingProduct, setIsSavingProduct] = useState(false)
  const [saveProductError, setSaveProductError] = useState<string | null>(null)

  const openAddProductModal = useCallback(() => {
    setEditingProduct(null)
    setSaveProductError(null)
    setIsAddProductModalOpen(true)
  }, [])

  const closeAddProductModal = useCallback(() => {
    setSaveProductError(null)
    setIsAddProductModalOpen(false)
  }, [])

  const openManageProductsPanel = useCallback(() => {
    setIsManageProductsPanelOpen(true)
  }, [])

  const closeManageProductsPanel = useCallback(() => {
    setIsManageProductsPanelOpen(false)
  }, [])

  const togglePromotion = useCallback(() => {
    setIsPromotionEnabled((currentValue) => !currentValue)
  }, [])

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
      const [loadedProducts, loadedCategories] = await Promise.all([
        listProductsByStore(storeId),
        listCategoriesByStore(storeId),
      ])
      const categoryLabels = new Map(
        loadedCategories.map((category) => [category.id, category.name]),
      )
      setCategories(loadedCategories.map(mapCategoryToOption))
      setCategoryStatus('success')
      setProducts(
        loadedProducts.map((product) => ({
          ...product,
          categoryLabel: categoryLabels.get(product.categoryId) ?? product.categoryLabel,
        })),
      )
      setListStatus('success')
    } catch (error) {
      setListStatus('error')
      setListError(mapProductManagementError(error))
    }
  }, [storeId])

  const loadCategories = useCallback(async () => {
    if (!storeId) {
      setCategories([])
      setCategoryStatus('error')
      setCategoryError('Conecte uma loja antes de carregar categorias.')
      return
    }

    setCategoryStatus('loading')
    setCategoryError(null)

    try {
      const loadedCategories = await listCategoriesByStore(storeId)
      setCategories(loadedCategories.map(mapCategoryToOption))
      setCategoryStatus('success')
    } catch (error) {
      setCategoryStatus('error')
      setCategoryError(mapProductManagementError(error).message)
    }
  }, [storeId])

  const createProductCategory = useCallback(
    async (name: string): Promise<ProductCategoryOption | null> => {
      const session = getAuthSession()
      if (!storeId || !session) {
        setCategoryError('Sua loja ou sessão não está disponível. Entre novamente e tente de novo.')
        return null
      }

      setCategoryError(null)
      try {
        const createdCategory = await createCategory(
          { name, storeId },
          { authToken: session.accessToken },
        )
        const option = mapCategoryToOption(createdCategory)
        setCategories((currentCategories) => [...currentCategories, option])
        setCategoryStatus('success')
        onProductsChanged?.()
        return option
      } catch (error) {
        setCategoryError(mapProductManagementError(error).message)
        return null
      }
    },
    [onProductsChanged, storeId],
  )

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

  const saveNewProduct = useCallback(
    async (values: ProductManagementEditableFormValues) => {
      const validation = productFormSchema.safeParse(values)
      if (!validation.success) {
        setSaveProductError(validation.error.issues[0]?.message ?? PRODUCT_MANAGEMENT_ERROR_MESSAGES.validation)
        return
      }

      const session = getAuthSession()
      if (!storeId || !session) {
        setSaveProductError('Sua loja ou sessão não está disponível. Entre novamente e tente de novo.')
        return
      }

      const categoryId = validation.data.categoryId
      if (!categoryId) {
        setSaveProductError('Selecione uma categoria válida.')
        return
      }

      setIsSavingProduct(true)
      setSaveProductError(null)

      try {
        const priceCents = currencyInputToCents(validation.data.price)
        const promoPriceCents = currencyInputToCents(validation.data.promotion.promoPrice)
        const createdProduct = await createProduct(
          {
            available: values.available,
            categoryId,
            description: validation.data.description || undefined,
            name: validation.data.name,
            priceCents,
            promoEndsAt: validation.data.promotion.promotionEnabled
              ? normalizePromoEndsAt(validation.data.promotion.promoEndsAt) ?? undefined
              : undefined,
            promoPriceCents:
              validation.data.promotion.promotionEnabled && promoPriceCents > 0
                ? promoPriceCents
                : undefined,
            storeId,
          },
          { authToken: session.accessToken },
        )
        const categoryLabel = categories.find(
          (category) => category.id === createdProduct.categoryId,
        )?.label
        const visibleProduct = { ...createdProduct, categoryLabel }

        setProducts((currentProducts) => [visibleProduct, ...currentProducts])
        onProductsChanged?.()
        setListStatus('success')
        setProductActionSuccess(createdProduct.id)
        setIsAddProductModalOpen(false)
        setIsManageProductsPanelOpen(true)
      } catch (error) {
        setSaveProductError(mapProductManagementError(error).message)
      } finally {
        setIsSavingProduct(false)
      }
    },
    [categories, onProductsChanged, setProductActionSuccess, storeId],
  )

  const saveEditingProduct = useCallback(async (values?: ProductManagementEditableFormValues) => {
    if (!editingProduct) {
      return
    }

    setProductActionLoading(editingProduct.id)

    try {
      const session = getAuthSession()
      if (!session) {
        setProductActionError({
          code: 'unknown',
          message: 'Sua sessão expirou. Entre novamente para editar o produto.',
        })
        return
      }
      const updatedProduct = await updateProduct(
        editingProduct.id,
        values
          ? createUpdatePayloadFromFormValues(values, editingProduct)
          : createUpdatePayloadFromProduct(editingProduct),
        { authToken: session.accessToken },
      )
      const updatedProductWithCategory = {
        ...updatedProduct,
        categoryLabel:
          categories.find((category) => category.id === updatedProduct.categoryId)?.label ??
          editingProduct.categoryLabel,
      }

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProductWithCategory : product,
        ),
      )
      setProductActionSuccess(updatedProduct.id)
      onProductsChanged?.()
      setEditingProduct(null)
      setIsAddProductModalOpen(false)
    } catch (error) {
      setProductActionError(mapProductManagementError(error))
    }
  }, [categories, editingProduct, onProductsChanged, setProductActionError, setProductActionLoading, setProductActionSuccess])

  const handleToggleProductAvailability = useCallback(
    async (product: ManageProductListItem) => {
      setProductActionLoading(product.id)

      try {
        const session = getAuthSession()
        if (!session) {
          setProductActionError({
            code: 'unknown',
            message: 'Sua sessão expirou. Entre novamente para alterar o produto.',
          })
          return
        }
        const updatedProduct = await toggleProductAvailability(product.id, {
          authToken: session.accessToken,
        })
        const updatedProductWithCategory = {
          ...updatedProduct,
          categoryLabel: product.categoryLabel,
        }

        setProducts((currentProducts) =>
          currentProducts.map((currentProduct) =>
            currentProduct.id === updatedProduct.id
              ? updatedProductWithCategory
              : currentProduct,
          ),
        )
        setProductActionSuccess(updatedProduct.id)
        onProductsChanged?.()
      } catch (error) {
        setProductActionError(mapProductManagementError(error))
      }
    },
    [onProductsChanged, setProductActionError, setProductActionLoading, setProductActionSuccess],
  )

  const confirmDeleteProduct = useCallback(async () => {
    if (!selectedProductForDelete) {
      return
    }

    setProductActionLoading(selectedProductForDelete.id)

    try {
      const session = getAuthSession()
      if (!session) {
        setProductActionError({
          code: 'unknown',
          message: 'Sua sessão expirou. Entre novamente para remover o produto.',
        })
        return
      }
      await deleteProduct(selectedProductForDelete.id, { authToken: session.accessToken })

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== selectedProductForDelete.id),
      )
      setProductActionSuccess(selectedProductForDelete.id)
      setSelectedProductForDelete(null)
      setIsDeleteConfirmationOpen(false)
      onProductsChanged?.()
    } catch (error) {
      setProductActionError(mapProductManagementError(error))
    }
  }, [
    selectedProductForDelete,
    onProductsChanged,
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
    categories,
    categoryError,
    categoryStatus,
    closeAddProductModal,
    closeDeleteConfirmation,
    closeEditProductModal,
    closeManageProductsPanel,
    confirmDeleteProduct,
    editingProduct,
    emptyProductsMessage,
    filteredProducts,
    filters,
    hasStoreId,
    isAddProductModalOpen,
    isDeleteConfirmationOpen,
    isManageProductsPanelOpen,
    isPromotionEnabled,
    isSavingProduct,
    listError,
    listStatus,
    loadProducts,
    loadCategories,
    openDeleteConfirmation,
    openAddProductModal,
    openEditProductModal,
    openManageProductsPanel,
    createProductCategory,
    prepareAvailabilityToggle,
    products,
    resetProductFilters,
    saveEditingProduct,
    saveNewProduct,
    saveProductError,
    selectedProductForDelete,
    setAvailabilityFilter,
    setCategoryFilter,
    setProductActionError,
    setProductActionLoading,
    setProductActionSuccess,
    setSearchTerm,
    setPromotionFilter,
    storeId,
    clearProductAction,
    handleToggleProductAvailability,
    togglePromotion,
  }
}
