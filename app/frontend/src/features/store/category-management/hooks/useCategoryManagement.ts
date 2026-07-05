import { useMemo, useState } from 'react'

import type {
  CategoryManagementFormValues,
  CategoryManagementHandlers,
  CategoryManagementItem,
  CategoryManagementState,
} from '../types/categoryManagement'

const emptyFormValues: CategoryManagementFormValues = {
  name: '',
}

const initialProductCategories: CategoryManagementItem[] = [
  {
    editable: true,
    id: 'category-lanches',
    kind: 'custom',
    name: 'LANCHES',
    productCount: 2,
    removable: true,
  },
  {
    editable: true,
    id: 'category-bebidas',
    kind: 'custom',
    name: 'BEBIDAS',
    productCount: 1,
    removable: true,
  },
]

function normalizeCategoryName(value: string) {
  return value.trim().replace(/\s+/g, ' ').toUpperCase()
}

function createSystemCategory(productCount: number): CategoryManagementItem {
  return {
    editable: false,
    id: 'category-all',
    kind: 'system',
    name: 'TODOS',
    productCount,
    removable: false,
  }
}

export function useCategoryManagement(): CategoryManagementState & CategoryManagementHandlers {
  const [customCategories, setCustomCategories] =
    useState<CategoryManagementItem[]>(initialProductCategories)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<CategoryManagementFormValues>(emptyFormValues)

  const categories = useMemo(() => {
    const totalProductCount = customCategories.reduce(
      (total, category) => total + category.productCount,
      0,
    )

    return [createSystemCategory(totalProductCount), ...customCategories]
  }, [customCategories])

  const onCategoryNameChange = (value: string) => {
    setErrorMessage(null)
    setFormValues({ name: value })
  }

  const onCancelEditCategory = () => {
    setEditingCategoryId(null)
    setErrorMessage(null)
    setFormValues(emptyFormValues)
  }

  const onSaveCategory = () => {
    if (!editingCategoryId) {
      return
    }

    const normalizedName = normalizeCategoryName(formValues.name)

    if (!normalizedName) {
      setErrorMessage('Informe o nome da categoria.')
      return
    }

    const categoryWithSameName = customCategories.find(
      (category) => category.name === normalizedName && category.id !== editingCategoryId,
    )

    if (categoryWithSameName) {
      setErrorMessage('Essa categoria ja existe.')
      return
    }

    setCustomCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.id === editingCategoryId ? { ...category, name: normalizedName } : category,
      ),
    )
    setEditingCategoryId(null)
    setFormValues(emptyFormValues)
  }

  const onEditCategory = (categoryId: string) => {
    const category = customCategories.find((currentCategory) => currentCategory.id === categoryId)

    if (!category?.editable) {
      return
    }

    setEditingCategoryId(category.id)
    setErrorMessage(null)
    setFormValues({ name: category.name })
  }

  const onRemoveCategory = (categoryId: string) => {
    const category = customCategories.find((currentCategory) => currentCategory.id === categoryId)

    if (!category?.removable) {
      return
    }

    setCustomCategories((currentCategories) =>
      currentCategories.filter((currentCategory) => currentCategory.id !== categoryId),
    )
    if (editingCategoryId === categoryId) {
      setEditingCategoryId(null)
      setFormValues(emptyFormValues)
    }
    setErrorMessage(null)
  }

  return {
    categories,
    editingCategoryId,
    errorMessage,
    formValues,
    onCancelEditCategory,
    onCategoryNameChange,
    onEditCategory,
    onRemoveCategory,
    onSaveCategory,
  }
}
