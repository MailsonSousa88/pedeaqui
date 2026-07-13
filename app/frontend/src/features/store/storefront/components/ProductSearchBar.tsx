import { ListFilter, Search, X } from 'lucide-react'
import { motion } from 'framer-motion'

type ProductSearchBarProps = {
  hasActiveFilters: boolean
  onClearFilters: () => void
  onSearchTermChange: (value: string) => void
  searchTerm: string
}

export function ProductSearchBar({
  hasActiveFilters,
  onClearFilters,
  onSearchTermChange,
  searchTerm,
}: ProductSearchBarProps) {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative min-w-0 flex-1">
        <Search
          aria-hidden="true"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={22}
          strokeWidth={2.2}
        />
        <input
          aria-label="Pesquisar produtos"
          className="h-14 w-full border-0 bg-white pl-12 pr-4 text-sm font-medium text-[#111111] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#e30507]/20"
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Pesquisar produtos"
          type="search"
          value={searchTerm}
        />
      </div>

      <motion.button
        aria-label={hasActiveFilters ? 'Limpar filtros de produtos' : 'Nenhum filtro ativo'}
        className="inline-flex h-14 shrink-0 items-center justify-center gap-2 border-l border-gray-200 px-4 text-sm font-semibold text-gray-500 transition-colors enabled:hover:bg-[#fff0f0] enabled:hover:text-[#e30507] disabled:cursor-default disabled:opacity-60 sm:px-6"
        disabled={!hasActiveFilters}
        onClick={onClearFilters}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        type="button"
        whileHover={hasActiveFilters ? { scale: 1.03 } : undefined}
        whileTap={hasActiveFilters ? { scale: 0.97 } : undefined}
      >
        {hasActiveFilters ? (
          <X aria-hidden="true" size={20} strokeWidth={2.2} />
        ) : (
          <ListFilter aria-hidden="true" size={20} strokeWidth={2.2} />
        )}
        {hasActiveFilters ? 'Limpar' : 'Filtrar'}
      </motion.button>
    </div>
  )
}
