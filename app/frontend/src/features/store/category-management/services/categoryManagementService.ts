import { apiClient } from '../../../../shared/services/api'

type CategoryApiItem = {
  id: string
  storeId: string
  tenantId: string
  name: string
  description?: string | null
  sortOrder: number
}

type ProductApiItem = {
  id: string
  categoryId: string
}

type CategoryRequestOptions = {
  authToken?: string
}

export const listStoreCategories = (storeId: string) =>
  apiClient.get<CategoryApiItem[]>(`/api/categories/store/${encodeURIComponent(storeId)}`)

export const listStoreProductsForCategoryCount = (storeId: string) =>
  apiClient.get<ProductApiItem[]>(`/api/products/store/${encodeURIComponent(storeId)}`)

export const updateStoreCategory = (
  categoryId: string,
  name: string,
  options?: CategoryRequestOptions,
) =>
  apiClient.put<CategoryApiItem>(
    `/api/categories/${encodeURIComponent(categoryId)}`,
    { name },
    { authToken: options?.authToken },
  )

export const deleteStoreCategory = (
  categoryId: string,
  options?: CategoryRequestOptions,
) =>
  apiClient.delete<void>(`/api/categories/${encodeURIComponent(categoryId)}`, {
    authToken: options?.authToken,
  })
