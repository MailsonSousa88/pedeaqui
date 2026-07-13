import { useEffect, useMemo, useState } from 'react'

import { getAuthSession } from '../../../../shared/services/authSession'
import {
  createStoreCategory,
  deleteStoreCategory,
  listStoreCategories,
  listStoreProductsForCategoryCount,
  updateStoreCategory,
} from '../services/categoryManagementService'
import type {
  CategoryManagementFormValues,
  CategoryManagementHandlers,
  CategoryManagementItem,
  CategoryManagementState,
} from '../types/categoryManagement'

const emptyFormValues: CategoryManagementFormValues = { name: '' }

function normalizeCategoryName(value: string) {
  return value.trim().replace(/\s+/g, ' ').toUpperCase()
}

export function useCategoryManagement(
  storeId?: string | null,
  onCategoriesChanged?: () => void,
): CategoryManagementState & CategoryManagementHandlers {
  const [categories, setCategories] = useState<CategoryManagementItem[]>([])
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<CategoryManagementFormValues>(emptyFormValues)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [status, setStatus] = useState<CategoryManagementState['status']>(
    storeId ? 'loading' : 'missing',
  )

  useEffect(() => {
    let isActive = true

    if (!storeId) {
      return () => {
        isActive = false
      }
    }

    void Promise.all([listStoreCategories(storeId), listStoreProductsForCategoryCount(storeId)])
      .then(([loadedCategories, loadedProducts]) => {
        if (!isActive) {
          return
        }

        const productCountByCategory = loadedProducts.reduce((counts, product) => {
          counts.set(product.categoryId, (counts.get(product.categoryId) ?? 0) + 1)
          return counts
        }, new Map<string, number>())
        const totalProductCount = loadedProducts.length

        setCategories(
          loadedCategories.map((category) => {
            const isSystemCategory = category.name.trim().toLocaleLowerCase('pt-BR') === 'todos'
            return {
              editable: !isSystemCategory,
              id: category.id,
              kind: isSystemCategory ? 'system' : 'custom',
              name: normalizeCategoryName(category.name),
              productCount: isSystemCategory
                ? totalProductCount
                : (productCountByCategory.get(category.id) ?? 0),
              removable: !isSystemCategory,
            }
          }),
        )
        setStatus('success')
        setErrorMessage(null)
      })
      .catch(() => {
        if (isActive) {
          setStatus('error')
          setErrorMessage('Não foi possível carregar as categorias da loja.')
        }
      })

    return () => {
      isActive = false
    }
  }, [storeId])

  const editingCategory = useMemo(
    () => categories.find((category) => category.id === editingCategoryId) ?? null,
    [categories, editingCategoryId],
  )

  const onCategoryNameChange = (value: string) => {
    setErrorMessage(null)
    setFormValues({ name: value })
  }

  const onNewCategoryNameChange = (value: string) => {
    setErrorMessage(null)
    setNewCategoryName(value)
  }

  const onCreateCategory = async () => {
    const normalizedName = normalizeCategoryName(newCategoryName)
    if (!storeId) {
      setErrorMessage('Nenhuma loja foi carregada para criar a categoria.')
      return
    }

    if (!normalizedName) {
      setErrorMessage('Informe o nome da categoria.')
      return
    }

    if (categories.some((category) => category.name === normalizedName)) {
      setErrorMessage('Essa categoria já existe.')
      return
    }

    const session = getAuthSession()
    if (!session) {
      setErrorMessage('Sua sessão expirou. Entre novamente para criar a categoria.')
      return
    }

    try {
      const createdCategory = await createStoreCategory(storeId, normalizedName, {
        authToken: session.accessToken,
      })
      setCategories((currentCategories) => [
        ...currentCategories,
        {
          editable: true,
          id: createdCategory.id,
          kind: 'custom',
          name: normalizeCategoryName(createdCategory.name),
          productCount: 0,
          removable: true,
        },
      ])
      setNewCategoryName('')
      setErrorMessage(null)
      onCategoriesChanged?.()
    } catch {
      setErrorMessage('Não foi possível criar a categoria. Tente novamente.')
    }
  }

  const onCancelEditCategory = () => {
    setEditingCategoryId(null)
    setErrorMessage(null)
    setFormValues(emptyFormValues)
  }

  const onSaveCategory = async () => {
    if (!editingCategory || !storeId) {
      return
    }

    const normalizedName = normalizeCategoryName(formValues.name)
    if (!normalizedName) {
      setErrorMessage('Informe o nome da categoria.')
      return
    }

    const duplicatedCategory = categories.some(
      (category) => category.name === normalizedName && category.id !== editingCategory.id,
    )
    if (duplicatedCategory) {
      setErrorMessage('Essa categoria já existe.')
      return
    }

    const session = getAuthSession()
    if (!session) {
      setErrorMessage('Sua sessão expirou. Entre novamente para editar a categoria.')
      return
    }

    try {
      const updatedCategory = await updateStoreCategory(editingCategory.id, normalizedName, {
        authToken: session.accessToken,
      })
      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category.id === editingCategory.id
            ? { ...category, name: normalizeCategoryName(updatedCategory.name) }
            : category,
        ),
      )
      onCancelEditCategory()
      onCategoriesChanged?.()
    } catch {
      setErrorMessage('Não foi possível salvar a categoria. Tente novamente.')
    }
  }

  const onEditCategory = (categoryId: string) => {
    const category = categories.find((currentCategory) => currentCategory.id === categoryId)
    if (!category?.editable) {
      return
    }

    setEditingCategoryId(category.id)
    setErrorMessage(null)
    setFormValues({ name: category.name })
  }

  const onRemoveCategory = async (categoryId: string) => {
    const category = categories.find((currentCategory) => currentCategory.id === categoryId)
    if (!category?.removable || !storeId) {
      return
    }

    if (category.productCount > 0) {
      setErrorMessage('Remova ou mova os produtos vinculados antes de excluir esta categoria.')
      return
    }

    const session = getAuthSession()
    if (!session) {
      setErrorMessage('Sua sessão expirou. Entre novamente para remover a categoria.')
      return
    }

    try {
      await deleteStoreCategory(categoryId, { authToken: session.accessToken })
      setCategories((currentCategories) =>
        currentCategories.filter((currentCategory) => currentCategory.id !== categoryId),
      )
      setErrorMessage(null)
      onCategoriesChanged?.()
    } catch {
      setErrorMessage('Não foi possível remover a categoria. Verifique os produtos vinculados.')
    }
  }

  return {
    categories,
    editingCategoryId,
    errorMessage,
    formValues,
    newCategoryName,
    onCancelEditCategory,
    onCategoryNameChange,
    onCreateCategory,
    onEditCategory,
    onRemoveCategory,
    onNewCategoryNameChange,
    onSaveCategory,
    status,
  }
}
