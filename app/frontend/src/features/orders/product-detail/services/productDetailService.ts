import { ApiError, apiClient } from '../../../../shared/services/api'
import type {
  PublicCategoryDto,
  PublicProductDto,
  PublicStoreDto,
} from '../types/productDetail'

export const getPublicStoreBySlug = (storeSlug: string) =>
  apiClient.get<PublicStoreDto>(`/api/stores/${encodeURIComponent(storeSlug)}`)

export const getPublicStoreProducts = (storeId: string) =>
  apiClient.get<PublicProductDto[]>(`/api/products/store/${encodeURIComponent(storeId)}`)

export const getPublicStoreCategories = (storeId: string) =>
  apiClient.get<PublicCategoryDto[]>(`/api/categories/store/${encodeURIComponent(storeId)}`)

export const isPublicResourceNotFoundError = (error: unknown) =>
  error instanceof ApiError && error.status === 404
