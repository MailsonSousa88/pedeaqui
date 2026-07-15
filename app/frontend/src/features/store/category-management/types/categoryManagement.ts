export type CategoryManagementKind = 'system' | 'custom'

export type CategoryManagementStatus = 'missing' | 'loading' | 'success' | 'error'

export type CategoryManagementItem = {
  id: string
  name: string
  kind: CategoryManagementKind
  productCount: number
  removable: boolean
  editable: boolean
}

export type CategoryManagementFormValues = {
  name: string
}

export type CategoryManagementState = {
  categories: CategoryManagementItem[]
  editingCategoryId: string | null
  errorMessage: string | null
  formValues: CategoryManagementFormValues
  status: CategoryManagementStatus
}

export type CategoryManagementHandlers = {
  onCategoryNameChange: (value: string) => void
  onCancelEditCategory: () => void
  onEditCategory: (categoryId: string) => void
  onRemoveCategory: (categoryId: string) => void
  onSaveCategory: () => void
}
