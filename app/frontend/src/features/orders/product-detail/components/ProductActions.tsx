import { ShoppingCart } from 'lucide-react'

import { SecondaryButton } from '../../../../shared/components/SecondaryButton'

type ProductActionsProps = {
  onBack: () => void
}

export function ProductActions({ onBack }: ProductActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <SecondaryButton className="w-full sm:w-auto" onClick={onBack} type="button">
        Voltar
      </SecondaryButton>

      <button
        className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#f3f4f6] px-5 py-3 text-sm font-semibold text-[#9ca3af] sm:w-auto"
        disabled
        type="button"
      >
        <ShoppingCart aria-hidden="true" size={18} />
        Adicionar ao carrinho
      </button>
    </div>
  )
}
