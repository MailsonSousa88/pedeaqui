import { ChevronRight, Store } from 'lucide-react'
import { useState } from 'react'
import type { KeyboardEvent } from 'react'

import type { StoreListCallbacks, StoreSummary } from '../types/storeList'

type StoreCardProps = {
  store: StoreSummary
  onSelectStore: StoreListCallbacks['onSelectStore']
}

export function StoreCard({ store, onSelectStore }: StoreCardProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const shouldShowImage = Boolean(store.imageSrc) && !hasImageError

  const selectStore = () => {
    if (store.isSelectable) {
      onSelectStore(store.id)
    }
  }

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectStore()
    }
  }

  return (
    <article
      role="button"
      tabIndex={store.isSelectable ? 0 : -1}
      aria-label={`Ver loja ${store.name}`}
      aria-disabled={!store.isSelectable}
      onClick={selectStore}
      onKeyDown={handleCardKeyDown}
      className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border bg-white p-3 shadow-sm transition-[border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e30507] focus-visible:ring-offset-2 motion-reduce:transition-none ${
        store.isSelectable
          ? 'cursor-pointer border-[#e5e7eb] hover:-translate-y-0.5 hover:border-[#e30507] hover:shadow-md motion-reduce:hover:translate-y-0'
          : 'cursor-not-allowed border-[#e5e7eb] opacity-60'
      }`}
    >
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#fff0f0] text-[#e30507]">
        {shouldShowImage ? (
          <img
            src={store.imageSrc}
            alt={store.imageAlt ?? ''}
            onError={() => setHasImageError(true)}
            className="size-full object-cover"
          />
        ) : (
          <Store size={26} aria-hidden="true" />
        )}
      </div>

      <div className="min-w-0">
        <h2 className="truncate text-base font-semibold text-[#111111]">
          {store.name}
        </h2>
        <p className="mt-1 truncate text-sm text-[#6b7280]">
          {store.description}
        </p>
      </div>

      <div
        className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1 text-sm font-semibold text-[#e30507]"
      >
        <span>Ver loja</span>
        <ChevronRight size={16} aria-hidden="true" />
      </div>
    </article>
  )
}
