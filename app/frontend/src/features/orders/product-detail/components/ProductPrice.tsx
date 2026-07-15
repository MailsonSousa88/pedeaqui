import { Tag } from 'lucide-react'

import { formatPrice } from '../utils/productDetail'

type ProductPriceProps = {
  priceCents: number
  promoPriceCents: number | null
}

export function ProductPrice({ priceCents, promoPriceCents }: ProductPriceProps) {
  if (promoPriceCents !== null) {
    return (
      <div aria-label="Preço promocional" className="flex flex-col items-start gap-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          <Tag aria-hidden="true" size={12} />
          Em promoção
        </span>
        <span className="mt-2 text-sm text-[#6b7280] line-through">
          {formatPrice(priceCents)}
        </span>
        <strong className="text-3xl font-bold leading-tight text-[#e30507]">
          {formatPrice(promoPriceCents)}
        </strong>
      </div>
    )
  }

  return (
    <strong aria-label={`Preço: ${formatPrice(priceCents)}`} className="text-3xl font-bold leading-tight text-[#111111]">
      {formatPrice(priceCents)}
    </strong>
  )
}
