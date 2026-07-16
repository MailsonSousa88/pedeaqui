import { useId } from 'react'
import { Minus, Plus } from 'lucide-react'

import { SecondaryButton } from '../../../../shared/components/SecondaryButton'
import { normalizeProductQuantity } from '../utils/productDetail'

type ProductQuantitySelectorProps = {
  value: number
  onDecrease: () => void
  onIncrease: () => void
  onValueChange: (value: string) => void
}

export function ProductQuantitySelector({
  value,
  onDecrease,
  onIncrease,
  onValueChange,
}: ProductQuantitySelectorProps) {
  const inputId = useId()
  const normalizedValue = normalizeProductQuantity(value)

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#111111]" htmlFor={inputId}>
        Quantidade
      </label>

      <div className="flex items-center gap-2">
        <SecondaryButton
          aria-label="Diminuir quantidade"
          disabled={normalizedValue === 1}
          onClick={onDecrease}
          size="icon"
          type="button"
        >
          <Minus aria-hidden="true" size={18} />
        </SecondaryButton>

        <input
          aria-label="Quantidade do produto"
          className="h-10 w-20 rounded-xl border border-gray-200 bg-white px-2 text-center text-sm font-semibold text-[#111111] transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
          id={inputId}
          inputMode="numeric"
          min={1}
          onChange={(event) => onValueChange(event.target.value)}
          step={1}
          type="number"
          value={normalizedValue}
        />

        <SecondaryButton
          aria-label="Aumentar quantidade"
          onClick={onIncrease}
          size="icon"
          type="button"
        >
          <Plus aria-hidden="true" size={18} />
        </SecondaryButton>
      </div>
    </div>
  )
}
