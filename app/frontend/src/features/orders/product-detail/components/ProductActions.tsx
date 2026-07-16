import { ShoppingCart } from 'lucide-react'

import { SecondaryButton } from '../../../../shared/components/SecondaryButton'

type ProductActionsProps = {
  onBack: () => void
  onAddToCart: () => void
  isAvailable?: boolean
}

export function ProductActions({ onBack, onAddToCart, isAvailable = true }: ProductActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <SecondaryButton className="w-full sm:w-auto" onClick={onBack} type="button">
        Voltar
      </SecondaryButton>

      <button
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold sm:w-auto transition-all cursor-pointer ${
          isAvailable
            ? 'bg-[#e30507] hover:bg-red-600 text-white shadow-md shadow-red-500/10'
            : 'bg-[#f3f4f6] text-[#9ca3af] cursor-not-allowed'
        }`}
        disabled={!isAvailable}
        onClick={onAddToCart}
        type="button"
      >
        <ShoppingCart aria-hidden="true" size={18} />
        Adicionar ao carrinho
      </button>
    </div>
  )
}
