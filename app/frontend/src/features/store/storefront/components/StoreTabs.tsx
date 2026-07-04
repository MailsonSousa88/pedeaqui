import { Grid2X2, Package, PlusCircle } from 'lucide-react'

import type { StorefrontTab, StorefrontTabKey } from '../types/storefront'

const storefrontTabs: StorefrontTab[] = [
  { key: 'products', label: 'Produtos' },
  { key: 'add', label: 'Adicionar' },
  { key: 'categories', label: 'Categorias' },
]

const iconByTab: Record<StorefrontTabKey, typeof Package> = {
  add: PlusCircle,
  categories: Grid2X2,
  products: Package,
}

export function StoreTabs() {
  return (
    <nav
      aria-label="Navegação visual da vitrine"
      className="grid grid-cols-3 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
    >
      {storefrontTabs.map((tab) => {
        const Icon = iconByTab[tab.key]
        const isActive = tab.key === 'products'

        return (
          <button
            aria-current={isActive ? 'page' : undefined}
            className={[
              'relative flex min-h-20 items-center justify-center gap-2 px-3 text-xs font-bold uppercase text-gray-500 sm:text-sm',
              isActive ? 'text-[#e30507]' : '',
            ].join(' ')}
            key={tab.key}
            type="button"
          >
            <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label}</span>
            {isActive ? (
              <span
                aria-hidden="true"
                className="absolute inset-x-5 bottom-0 h-1 rounded-full bg-[#e30507]"
              />
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}
