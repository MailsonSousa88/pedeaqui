import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import { ProductBasicInfoSection } from './ProductBasicInfoSection'
import { ProductCategorySection } from './ProductCategorySection'
import { ProductFormActions } from './ProductFormActions'
import { ProductImagePlaceholders } from './ProductImagePlaceholders'
import { ProductPromotionSection } from './ProductPromotionSection'
import { ProductStockSection } from './ProductStockSection'
import { ProductVariationSection } from './ProductVariationSection'
import type { ProductStockMode } from '../types/productManagement'

type AddProductModalProps = {
  activeImageSlot: 1 | 2 | 3
  isFeatured: boolean
  isOpen: boolean
  isPromotionEnabled: boolean
  onClose: () => void
  onNextImage: () => void
  onPreviousImage: () => void
  onStockModeChange: (mode: ProductStockMode) => void
  onToggleFeatured: () => void
  onTogglePromotion: () => void
  stockMode: ProductStockMode
}

export function AddProductModal({
  activeImageSlot,
  isFeatured,
  isOpen,
  isPromotionEnabled,
  onClose,
  onNextImage,
  onPreviousImage,
  onStockModeChange,
  onToggleFeatured,
  onTogglePromotion,
  stockMode,
}: AddProductModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            aria-labelledby="add-product-modal-title"
            aria-modal="true"
            className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
            exit={{ opacity: 0, scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.95 }}
            role="dialog"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5 sm:p-6">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold uppercase tracking-wide text-[#e30507]">
                  Novo produto
                </p>
                <h3 id="add-product-modal-title" className="text-xl font-black text-[#111111]">
                  Adicionar produto
                </h3>
                <p className="max-w-xl text-sm leading-6 text-[#6b7280]">
                  Preencha a estrutura visual do produto. Nada será salvo de verdade nesta
                  versão.
                </p>
              </div>

              <button
                aria-label="Fechar modal de adicionar produto"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
                onClick={onClose}
                type="button"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-8 overflow-y-auto p-5 sm:p-6">
              <ProductBasicInfoSection />
              <ProductCategorySection />
              <ProductImagePlaceholders
                activeImageSlot={activeImageSlot}
                onNext={onNextImage}
                onPrevious={onPreviousImage}
              />
              <ProductPromotionSection
                isFeatured={isFeatured}
                isPromotionEnabled={isPromotionEnabled}
                onToggleFeatured={onToggleFeatured}
                onTogglePromotion={onTogglePromotion}
              />
              <ProductStockSection
                onStockModeChange={onStockModeChange}
                stockMode={stockMode}
              />
              <ProductVariationSection />
              <ProductFormActions onCancel={onClose} onSave={onClose} />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
