import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import { SecondaryButton } from '../../../../shared/components/SecondaryButton'
import { ProductBasicInfoSection } from './ProductBasicInfoSection'
import { ProductCategorySection } from './ProductCategorySection'
import { ProductFormActions } from './ProductFormActions'
import { ProductImagePlaceholders } from './ProductImagePlaceholders'
import { ProductPromotionSection } from './ProductPromotionSection'
import { ProductVariationSection } from './ProductVariationSection'
import type {
  ManageProductListItem,
  ProductManagementEditableFormValues,
  ProductManagementFormMode,
} from '../types/productManagement'

type AddProductModalProps = {
  activeImageSlot: 1 | 2 | 3
  initialProduct?: ManageProductListItem | null
  isOpen: boolean
  isPromotionEnabled: boolean
  mode?: ProductManagementFormMode
  onClose: () => void
  onNextImage: () => void
  onPreviousImage: () => void
  onSave?: (values: ProductManagementEditableFormValues) => void
  onTogglePromotion: () => void
}

const formatCentsForInput = (priceCents?: number | null) => {
  if (!priceCents) {
    return ''
  }

  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(priceCents / 100)
}

const formatDateForInput = (date?: string | null) => {
  if (!date) {
    return ''
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return ''
  }

  return parsedDate.toISOString().slice(0, 16)
}

export function AddProductModal({
  activeImageSlot,
  initialProduct = null,
  isOpen,
  isPromotionEnabled,
  mode = 'create',
  onClose,
  onNextImage,
  onPreviousImage,
  onSave = onClose,
  onTogglePromotion,
}: AddProductModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const isEditMode = mode === 'edit'
  const modalTitle = isEditMode ? 'Editar produto' : 'Adicionar produto'
  const modalEyebrow = isEditMode ? 'Produto existente' : 'Novo produto'
  const modalDescription = isEditMode
    ? 'Atualize os dados principais do produto. Imagens e variações seguem fluxos próprios quando os contratos estiverem conectados.'
    : 'Preencha a estrutura visual do produto. Nada será salvo de verdade nesta versão.'
  const saveLabel = isEditMode ? 'Salvar alterações' : 'Salvar produto'

  const handleSave = () => {
    const formData = formRef.current ? new FormData(formRef.current) : new FormData()

    onSave({
      categoryId: String(formData.get('categoryId') ?? '') || null,
      description: String(formData.get('description') ?? ''),
      name: String(formData.get('name') ?? ''),
      price: String(formData.get('price') ?? ''),
      promotion: {
        promoEndsAt: String(formData.get('promoEndsAt') ?? ''),
        promoPrice: String(formData.get('promoPrice') ?? ''),
        promotionEnabled: isPromotionEnabled,
      },
    })
  }

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
                  {modalEyebrow}
                </p>
                <h3 id="add-product-modal-title" className="text-xl font-black text-[#111111]">
                  {modalTitle}
                </h3>
                <p className="max-w-xl text-sm leading-6 text-[#6b7280]">
                  {modalDescription}
                </p>
              </div>

              <SecondaryButton
                aria-label={`Fechar modal de ${modalTitle.toLowerCase()}`}
                className="text-gray-500"
                onClick={onClose}
                size="icon"
                type="button"
              >
                <X aria-hidden="true" size={18} />
              </SecondaryButton>
            </div>

            <form ref={formRef} className="flex flex-col gap-8 overflow-y-auto p-5 sm:p-6">
              <ProductBasicInfoSection
                initialAvailable={initialProduct?.available}
                initialDescription={initialProduct?.description}
                initialName={initialProduct?.name}
                initialPrice={formatCentsForInput(initialProduct?.priceCents)}
                mode={mode}
              />
              <ProductCategorySection
                initialCategoryId={initialProduct?.categoryId}
                initialCategoryLabel={initialProduct?.categoryLabel}
                mode={mode}
              />
              <ProductImagePlaceholders
                activeImageSlot={activeImageSlot}
                onNext={onNextImage}
                onPrevious={onPreviousImage}
              />
              <ProductPromotionSection
                initialPromoEndsAt={formatDateForInput(initialProduct?.promoEndsAt)}
                initialPromoPrice={formatCentsForInput(initialProduct?.promoPriceCents)}
                isPromotionEnabled={isPromotionEnabled}
                onTogglePromotion={onTogglePromotion}
              />
              <ProductVariationSection />
              <ProductFormActions onCancel={onClose} onSave={handleSave} saveLabel={saveLabel} />
            </form>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
