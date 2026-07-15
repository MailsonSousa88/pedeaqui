import { useCallback, useEffect, useState } from 'react'

import {
  getPublicStoreBySlug,
  getPublicStoreCategories,
  getPublicStoreProducts,
  isPublicResourceNotFoundError,
} from '../services/productDetailService'
import type { ProductDetailState } from '../types/productDetail'
import {
  createProductDetailViewModel,
  normalizeProductQuantity,
} from '../utils/productDetail'

type RequestResult = {
  requestKey: string
  state: ProductDetailState
}

type QuantityState = {
  productKey: string
  value: number
}

const GALLERY_ITEM_COUNT = 3

export function useProductDetail(storeSlug: string, productId: string) {
  const normalizedSlug = storeSlug.trim()
  const normalizedProductId = productId.trim()
  const productKey = `${normalizedSlug}:${normalizedProductId}`
  const [requestResult, setRequestResult] = useState<RequestResult | null>(null)
  const [requestRevision, setRequestRevision] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [quantityState, setQuantityState] = useState<QuantityState>({
    productKey,
    value: 1,
  })
  const requestKey =
    normalizedSlug && normalizedProductId
      ? `${normalizedSlug}:${normalizedProductId}:${requestRevision}`
      : null
  const quantity = quantityState.productKey === productKey ? quantityState.value : 1

  const retry = useCallback(() => {
    setRequestRevision((currentRevision) => currentRevision + 1)
  }, [])

  const showPreviousImage = useCallback(() => {
    setGalleryIndex((currentIndex) => Math.max(0, currentIndex - 1))
  }, [])

  const showNextImage = useCallback(() => {
    setGalleryIndex((currentIndex) =>
      Math.min(GALLERY_ITEM_COUNT - 1, currentIndex + 1),
    )
  }, [])

  const decreaseQuantity = useCallback(() => {
    setQuantityState((currentState) => {
      const currentQuantity =
        currentState.productKey === productKey ? currentState.value : 1

      return {
        productKey,
        value: Math.max(1, currentQuantity - 1),
      }
    })
  }, [productKey])

  const increaseQuantity = useCallback(() => {
    setQuantityState((currentState) => {
      const currentQuantity =
        currentState.productKey === productKey ? currentState.value : 1

      return {
        productKey,
        value: normalizeProductQuantity(currentQuantity + 1),
      }
    })
  }, [productKey])

  const setQuantityValue = useCallback((value: string | number) => {
    setQuantityState({
      productKey,
      value: normalizeProductQuantity(value),
    })
  }, [productKey])

  const resetQuantity = useCallback(() => {
    setQuantityState({ productKey, value: 1 })
  }, [productKey])

  useEffect(() => {
    let isActive = true

    if (!requestKey) {
      return () => {
        isActive = false
      }
    }

    void getPublicStoreBySlug(normalizedSlug)
      .then(async (store) => {
        if (!store.active) {
          if (isActive) {
            setRequestResult({
              requestKey,
              state: { reason: 'store', status: 'unavailable' },
            })
          }
          return
        }

        const [products, categories] = await Promise.all([
          getPublicStoreProducts(store.id),
          getPublicStoreCategories(store.id),
        ])

        if (!isActive) {
          return
        }

        const product = products.find(
          (candidate) =>
            candidate.id === normalizedProductId && candidate.storeId === store.id,
        )

        if (!product) {
          setRequestResult({
            requestKey,
            state: { reason: 'product', status: 'unavailable' },
          })
          return
        }

        setRequestResult({
          requestKey,
          state: {
            product: createProductDetailViewModel(store, product, categories),
            status: 'success',
          },
        })
      })
      .catch((error: unknown) => {
        if (!isActive) {
          return
        }

        if (isPublicResourceNotFoundError(error)) {
          setRequestResult({
            requestKey,
            state: { reason: 'store', status: 'unavailable' },
          })
          return
        }

        setRequestResult({
          requestKey,
          state: {
            message: 'Não foi possível carregar este produto. Tente novamente.',
            status: 'error',
          },
        })
      })

    return () => {
      isActive = false
    }
  }, [normalizedProductId, normalizedSlug, requestKey])

  const state: ProductDetailState = !normalizedSlug
    ? { reason: 'store', status: 'unavailable' }
    : !normalizedProductId
      ? { reason: 'product', status: 'unavailable' }
      : requestResult?.requestKey === requestKey
        ? requestResult.state
        : { status: 'loading' }

  return {
    gallery: {
      currentIndex: galleryIndex,
      itemCount: GALLERY_ITEM_COUNT,
      showNextImage,
      showPreviousImage,
    },
    quantity: {
      canDecrease: quantity > 1,
      decrease: decreaseQuantity,
      increase: increaseQuantity,
      reset: resetQuantity,
      setValue: setQuantityValue,
      value: quantity,
    },
    retry,
    state,
  }
}
