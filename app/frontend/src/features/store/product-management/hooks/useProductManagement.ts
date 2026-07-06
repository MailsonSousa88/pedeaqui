import { useCallback, useState } from 'react'

import type { ProductImageSlot, ProductStockMode } from '../types/productManagement'

const firstImageSlot: ProductImageSlot = 1
const lastImageSlot: ProductImageSlot = 3

export function useProductManagement() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [activeImageSlot, setActiveImageSlot] = useState<ProductImageSlot>(firstImageSlot)
  const [isFeatured, setIsFeatured] = useState(false)
  const [isPromotionEnabled, setIsPromotionEnabled] = useState(false)
  const [stockMode, setStockMode] = useState<ProductStockMode>('free')

  const openAddProductModal = useCallback(() => {
    setIsAddProductModalOpen(true)
  }, [])

  const closeAddProductModal = useCallback(() => {
    setIsAddProductModalOpen(false)
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

  return {
    activeImageSlot,
    closeAddProductModal,
    goToNextImageSlot,
    goToPreviousImageSlot,
    isAddProductModalOpen,
    isFeatured,
    isPromotionEnabled,
    openAddProductModal,
    setStockMode,
    stockMode,
    toggleFeatured,
    togglePromotion,
  }
}
