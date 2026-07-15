import { motion } from 'framer-motion'
import { AlertTriangle, Loader2, Trash2, X } from 'lucide-react'

import { SecondaryButton } from '../../../../shared/components/SecondaryButton'
import type {
  ManageProductListItem,
  ProductManagementActionState,
} from '../types/productManagement'

type ProductDeleteConfirmationProps = {
  action: ProductManagementActionState
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  product: ManageProductListItem | null
}

export function ProductDeleteConfirmation({
  action,
  isOpen,
  onCancel,
  onConfirm,
  product,
}: ProductDeleteConfirmationProps) {
  if (!isOpen || !product) {
    return null
  }

  const isDeleting = action.status === 'loading' && action.productId === product.id

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        aria-labelledby="delete-product-title"
        aria-modal="true"
        className="relative z-10 flex w-full max-w-md flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl"
        exit={{ opacity: 0, scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.95 }}
        role="alertdialog"
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#dc2626]">
            <AlertTriangle aria-hidden="true" size={22} />
          </span>

          <div className="flex min-w-0 flex-col gap-2">
            <h3 id="delete-product-title" className="text-lg font-bold text-[#111111]">
              Remover produto
            </h3>
            <p className="text-sm leading-6 text-[#6b7280]">
              Esta ação remove {product.name} da vitrine pública. O backend tratará a remoção como
              soft delete.
            </p>
          </div>
        </div>

        {action.status === 'error' && action.error ? (
          <p className="rounded-xl border border-[#dc2626]/20 bg-red-50 p-3 text-sm leading-6 text-[#dc2626]">
            {action.error.message}
          </p>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <SecondaryButton
            disabled={isDeleting}
            onClick={onCancel}
            type="button"
          >
            <X aria-hidden="true" size={16} />
            Cancelar
          </SecondaryButton>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#dc2626] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isDeleting}
            onClick={onConfirm}
            type="button"
          >
            {isDeleting ? (
              <Loader2 aria-hidden="true" className="animate-spin" size={16} />
            ) : (
              <Trash2 aria-hidden="true" size={16} />
            )}
            Confirmar remoção
          </button>
        </div>
      </motion.div>
    </div>
  )
}
