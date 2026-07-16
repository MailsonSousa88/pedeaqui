import { useEffect, useState } from 'react'

import { getStorefrontCategories, getStorefrontProducts } from '../services/storefrontService'
import type {
  StorefrontCatalogStatus,
  StorefrontCategory,
  StorefrontProduct,
} from '../types/storefront'

export function useStorefrontProducts(storeId?: string | null, refreshKey = 0) {
  const [products, setProducts] = useState<StorefrontProduct[]>([])
  const [categories, setCategories] = useState<StorefrontCategory[]>([])
  const [resolvedRequestKey, setResolvedRequestKey] = useState<string | null>(null)
  const [failedRequestKey, setFailedRequestKey] = useState<string | null>(null)
  const [requestRevision, setRequestRevision] = useState(0)
  const requestKey = storeId ? `${storeId}:${refreshKey}:${requestRevision}` : null

  useEffect(() => {
    let isActive = true

    if (!storeId) {
      return () => {
        isActive = false
      }
    }

    void Promise.all([getStorefrontProducts(storeId), getStorefrontCategories(storeId)])
      .then(([loadedProducts, loadedCategories]) => {
        if (!isActive) {
          return
        }

        const categoryLabels = new Map(
          loadedCategories.map((category) => [category.id, category.name]),
        )
        setCategories(loadedCategories)
        setProducts(
          loadedProducts.map((product) => ({
            ...product,
            categoryLabel: categoryLabels.get(product.categoryId) ?? null,
          })),
        )
        setResolvedRequestKey(requestKey)
        setFailedRequestKey(null)
      })
      .catch(() => {
        if (isActive) {
          setFailedRequestKey(requestKey)
        }
      })

    return () => {
      isActive = false
    }
  }, [requestKey, storeId])

  const status: StorefrontCatalogStatus = !requestKey
    ? 'missing'
    : failedRequestKey === requestKey
      ? 'error'
      : resolvedRequestKey === requestKey
        ? 'success'
        : 'loading'

  return {
    categories: status === 'success' ? categories : [],
    products: status === 'success' ? products : [],
    retry: () => setRequestRevision((currentRevision) => currentRevision + 1),
    status,
  }
}
