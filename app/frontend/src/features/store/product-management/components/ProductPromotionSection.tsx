import { useRef, useState } from 'react'
import {
  BadgePercent,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Sparkles,
} from 'lucide-react'

import { formatCurrencyInput } from '../utils/currencyInput'

type ProductPromotionSectionProps = {
  initialPromoEndsAt?: string | null
  initialPromoPrice?: string
  isFeatured: boolean
  isPromotionEnabled: boolean
  onToggleFeatured: () => void
  onTogglePromotion: () => void
}

export function ProductPromotionSection({
  initialPromoEndsAt = '',
  initialPromoPrice = '',
  isFeatured,
  isPromotionEnabled,
  onToggleFeatured,
  onTogglePromotion,
}: ProductPromotionSectionProps) {
  const [promoEndsAt, setPromoEndsAt] = useState(initialPromoEndsAt ?? '')
  const [promoPrice, setPromoPrice] = useState(initialPromoPrice)
  const promoEndsAtInputRef = useRef<HTMLInputElement>(null)

  const openPromoEndsAtPicker = () => {
    promoEndsAtInputRef.current?.focus()
    promoEndsAtInputRef.current?.showPicker?.()
  }

  return (
    <section className="flex flex-col gap-4" aria-labelledby="product-promotion-title">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0f0] text-[#e30507]">
          <BadgePercent aria-hidden="true" size={20} />
        </span>
        <div>
          <h4 id="product-promotion-title" className="text-base font-bold text-[#111111]">
            Destaque e promoção
          </h4>
          <p className="text-sm leading-6 text-[#6b7280]">
            A promoção só pode ser configurada quando o produto estiver marcado como destaque.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          aria-pressed={isFeatured}
          className={[
            'flex min-h-24 items-start gap-3 rounded-2xl border p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2',
            isFeatured
              ? 'border-[#16a34a] bg-[#f0fdf4] text-[#111111]'
              : 'border-gray-200 bg-white text-[#111111] hover:border-[#e30507]/60',
          ].join(' ')}
          onClick={onToggleFeatured}
          type="button"
        >
          {isFeatured ? (
            <CheckCircle2 aria-hidden="true" className="mt-0.5 text-[#16a34a]" size={20} />
          ) : (
            <Sparkles aria-hidden="true" className="mt-0.5 text-[#e30507]" size={20} />
          )}
          <span className="flex flex-col gap-1">
            <span className="text-sm font-bold">Produto em destaque</span>
            <span className="text-xs leading-5 text-[#6b7280]">
              Habilita o produto para áreas de destaque da vitrine.
            </span>
          </span>
        </button>

        <button
          aria-disabled={!isFeatured}
          aria-pressed={isPromotionEnabled}
          className={[
            'flex min-h-24 items-start gap-3 rounded-2xl border p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2',
            isPromotionEnabled
              ? 'border-[#16a34a] bg-[#f0fdf4] text-[#111111]'
              : 'border-gray-200 bg-white text-[#111111]',
            !isFeatured ? 'cursor-not-allowed opacity-55' : 'hover:border-[#e30507]/60',
          ].join(' ')}
          onClick={onTogglePromotion}
          type="button"
        >
          {isPromotionEnabled ? (
            <CheckCircle2 aria-hidden="true" className="mt-0.5 text-[#16a34a]" size={20} />
          ) : (
            <BadgePercent aria-hidden="true" className="mt-0.5 text-[#e30507]" size={20} />
          )}
          <span className="flex flex-col gap-1">
            <span className="text-sm font-bold">Produto em promoção</span>
            <span className="text-xs leading-5 text-[#6b7280]">
              Disponível somente quando o destaque estiver ativo.
            </span>
          </span>
        </button>
      </div>

      {isFeatured && isPromotionEnabled ? (
        <div className="grid gap-4 rounded-2xl border border-gray-100 bg-[#f5f5f5] p-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#111111]">Preço promocional</span>
            <span className="relative">
              <CircleDollarSign
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
                size={16}
              />
              <input
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
                inputMode="numeric"
                name="promoPrice"
                onChange={(event) => setPromoPrice(formatCurrencyInput(event.target.value))}
                placeholder="0,00"
                type="text"
                value={promoPrice}
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#111111]">
              Fim da promoção opcional
            </span>
            <span
              className="relative block cursor-pointer"
              onClick={openPromoEndsAtPicker}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  openPromoEndsAtPicker()
                }
              }}
              role="button"
              tabIndex={0}
            >
              <CalendarClock
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
                size={16}
              />
              <input
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
                name="promoEndsAt"
                onChange={(event) => setPromoEndsAt(event.target.value)}
                ref={promoEndsAtInputRef}
                type="datetime-local"
                value={promoEndsAt}
              />
            </span>
          </label>
        </div>
      ) : null}
    </section>
  )
}
