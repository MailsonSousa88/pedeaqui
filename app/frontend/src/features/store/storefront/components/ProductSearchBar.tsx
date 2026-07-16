import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'

import type { StorefrontSortOption } from '../types/storefront'

type ProductSearchBarProps = {
  hasActiveFilters: boolean
  maximumPrice: string
  minimumPrice: string
  onClearFilters: () => void
  onMaximumPriceChange: (value: string) => void
  onMinimumPriceChange: (value: string) => void
  onSearchTermChange: (value: string) => void
  onSortChange: (value: StorefrontSortOption) => void
  searchTerm: string
  sort: StorefrontSortOption
}

const inputClassName =
  'h-12 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-[#111111] placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]'

export function ProductSearchBar({
  hasActiveFilters,
  maximumPrice,
  minimumPrice,
  onClearFilters,
  onMaximumPriceChange,
  onMinimumPriceChange,
  onSearchTermChange,
  onSortChange,
  searchTerm,
  sort,
}: ProductSearchBarProps) {
  return (
    <section
      aria-label="Busca e filtros de produtos"
      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_150px_150px_190px_auto] lg:items-end">
        <label className="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-[#111111]">
          Buscar produto
          <span className="relative">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              className={`${inputClassName} pl-10`}
              onChange={(event) => onSearchTermChange(event.target.value)}
              placeholder="Digite o nome do produto"
              type="search"
              value={searchTerm}
            />
          </span>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#111111]">
          Preço mínimo
          <input
            className={inputClassName}
            inputMode="decimal"
            min="0"
            onChange={(event) => onMinimumPriceChange(event.target.value)}
            placeholder="R$ 0,00"
            step="0.01"
            type="number"
            value={minimumPrice}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#111111]">
          Preço máximo
          <input
            className={inputClassName}
            inputMode="decimal"
            min="0"
            onChange={(event) => onMaximumPriceChange(event.target.value)}
            placeholder="Sem limite"
            step="0.01"
            type="number"
            value={maximumPrice}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#111111]">
          Ordenar
          <select
            className={inputClassName}
            onChange={(event) => onSortChange(event.target.value as StorefrontSortOption)}
            value={sort}
          >
            <option value="name-asc">Nome: A–Z</option>
            <option value="name-desc">Nome: Z–A</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
          </select>
        </label>

        <motion.button
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-[#111111] transition-all hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!hasActiveFilters}
          onClick={onClearFilters}
          transition={{ duration: 0.2 }}
          type="button"
          whileHover={hasActiveFilters ? { scale: 1.03 } : undefined}
          whileTap={hasActiveFilters ? { scale: 0.97 } : undefined}
        >
          <X aria-hidden="true" size={18} />
          Limpar
        </motion.button>
      </div>
    </section>
  )
}
