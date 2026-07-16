import { ApiError, ApiNetworkError, apiClient } from '../../../../shared/services/api'
import {
  PRODUCT_MANAGEMENT_ERROR_MESSAGES,
  type CreateCategoryPayload,
  type CreateProductPayload,
  type ManageProductListItem,
  type ProductManagementApiCategory,
  type ProductManagementError,
  type ProductManagementErrorCode,
  type UpdateProductPayload,
} from '../types/productManagement'

type ProductManagementRequestOptions = {
  authToken?: string
}

const productsBasePath = '/api/products'
const categoriesBasePath = '/api/categories'

const productByIdPath = (productId: string) => `${productsBasePath}/${productId}`

const normalizeProductListResponse = (response: unknown): ManageProductListItem[] => {
  if (Array.isArray(response)) {
    return response as ManageProductListItem[]
  }

  if (response && typeof response === 'object') {
    const maybeItems = (response as { data?: unknown; items?: unknown; products?: unknown })

    if (Array.isArray(maybeItems.data)) {
      return maybeItems.data as ManageProductListItem[]
    }

    if (Array.isArray(maybeItems.items)) {
      return maybeItems.items as ManageProductListItem[]
    }

    if (Array.isArray(maybeItems.products)) {
      return maybeItems.products as ManageProductListItem[]
    }
  }

  return []
}

const getMessageByCode = (code: ProductManagementErrorCode) => {
  const messages = PRODUCT_MANAGEMENT_ERROR_MESSAGES

  const messageByCode = {
    foreign_product: messages.foreignProduct,
    invalid_category: messages.invalidCategory,
    network: messages.network,
    plan_limit_reached: messages.planLimitReached,
    removed_category: messages.removedCategory,
    unknown: messages.unknown,
    validation: messages.validation,
  } satisfies Record<ProductManagementErrorCode, string>

  return messageByCode[code]
}

const bodyIncludes = (body: unknown, pattern: RegExp) => {
  if (typeof body === 'string') {
    return pattern.test(body)
  }

  if (body && typeof body === 'object') {
    return pattern.test(JSON.stringify(body))
  }

  return false
}

const resolveApiErrorCode = (error: ApiError): ProductManagementErrorCode => {
  if (error.status === 422) {
    return 'validation'
  }

  if (bodyIncludes(error.body, /limite do plano|limite de produtos/i)) {
    return 'plan_limit_reached'
  }

  if (bodyIncludes(error.body, /outra loja|outro tenant|tenant|forbidden|unauthorized/i)) {
    return 'foreign_product'
  }

  if (bodyIncludes(error.body, /categoria.*removida|categoria.*deletada|deleted/i)) {
    return 'removed_category'
  }

  if (bodyIncludes(error.body, /categoria|category/i)) {
    return 'invalid_category'
  }

  if (error.status === 403) {
    return 'foreign_product'
  }

  return 'unknown'
}

export const mapProductManagementError = (error: unknown): ProductManagementError => {
  if (error instanceof ApiNetworkError) {
    return {
      code: 'network',
      message: getMessageByCode('network'),
    }
  }

  if (error instanceof ApiError) {
    const code = resolveApiErrorCode(error)

    return {
      code,
      message: getMessageByCode(code),
    }
  }

  return {
    code: 'unknown',
    message: getMessageByCode('unknown'),
  }
}

export async function listProductsByStore(storeId: string) {
  const response = await apiClient.get<unknown>(`${productsBasePath}/store/${storeId}`)

  return normalizeProductListResponse(response)
}

export function createProduct(
  payload: CreateProductPayload,
  options?: ProductManagementRequestOptions,
) {
  return apiClient.post<ManageProductListItem>(productsBasePath, payload, {
    authToken: options?.authToken,
  })
}

export function listCategoriesByStore(storeId: string) {
  return apiClient.get<ProductManagementApiCategory[]>(`${categoriesBasePath}/store/${storeId}`)
}

export function createCategory(
  payload: CreateCategoryPayload,
  options?: ProductManagementRequestOptions,
) {
  return apiClient.post<ProductManagementApiCategory>(categoriesBasePath, payload, {
    authToken: options?.authToken,
  })
}

export function updateProduct(
  productId: string,
  payload: UpdateProductPayload,
  options?: ProductManagementRequestOptions,
) {
  return apiClient.put<ManageProductListItem>(productByIdPath(productId), payload, {
    authToken: options?.authToken,
  })
}

export function toggleProductAvailability(
  productId: string,
  options?: ProductManagementRequestOptions,
) {
  return apiClient.patch<ManageProductListItem>(
    `${productByIdPath(productId)}/toggle-availability`,
    undefined,
    {
      authToken: options?.authToken,
    },
  )
}

export function deleteProduct(productId: string, options?: ProductManagementRequestOptions) {
  return apiClient.delete<void>(productByIdPath(productId), {
    authToken: options?.authToken,
  })
}

