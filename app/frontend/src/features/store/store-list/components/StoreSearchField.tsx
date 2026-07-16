import { Search, X } from 'lucide-react'

import type { StoreListCallbacks } from '../types/storeList'

type StoreSearchFieldProps = {
  value: string
  onSearchChange: StoreListCallbacks['onSearchChange']
}

export function StoreSearchField({
  value,
  onSearchChange,
}: StoreSearchFieldProps) {
  return (
    <div className="w-full">
      <label htmlFor="store-search" className="sr-only">
        Pesquisar lojas pelo nome
      </label>

      <div className="relative">
        <Search
          size={20}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280]"
        />
        <input
          id="store-search"
          type="text"
          value={value}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Pesquisar lojas"
          autoComplete="off"
          className="min-h-12 w-full rounded-xl border border-[#e5e7eb] bg-white py-3 pl-12 pr-10 text-sm text-[#111111] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-[#e30507] focus:ring-2 focus:ring-[#e30507]/20"
        />
        {value && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-gray-700 cursor-pointer"
            aria-label="Limpar pesquisa"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
