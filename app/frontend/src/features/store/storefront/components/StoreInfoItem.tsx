import { Clock, MapPin, MessageCircle } from 'lucide-react'

import type { StorefrontInfoItem as StorefrontInfoItemType } from '../types/storefront'

type StoreInfoItemProps = {
  isLoading?: boolean
  item: StorefrontInfoItemType
}

const iconByKey = {
  address: MapPin,
  businessHours: Clock,
  whatsapp: MessageCircle,
}

export function StoreInfoItem({ isLoading = false, item }: StoreInfoItemProps) {
  const Icon = iconByKey[item.key]

  return (
    <div className="flex items-start gap-3 border-t border-gray-100 py-4 first:border-t-0 first:pt-0 last:pb-0">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#fff0f0] text-[#e30507]">
        <Icon aria-hidden="true" size={18} strokeWidth={2.2} />
      </span>

      <div className="min-w-0 flex-1 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-normal text-gray-400">
          {item.label}
        </p>
        {item.value ? (
          <p className="max-w-2xl break-words text-sm leading-relaxed text-[#111111] md:text-base">
            {item.value}
          </p>
        ) : isLoading ? (
          <>
            <div
              aria-hidden="true"
              className="h-4 w-full max-w-56 animate-pulse rounded-full bg-gray-100"
            />
            <span className="sr-only">{item.label} carregando.</span>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-[#6b7280]">Não informado</p>
        )}
      </div>
    </div>
  )
}
