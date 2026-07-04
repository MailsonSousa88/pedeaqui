import { ListFilter, Search } from 'lucide-react'

export function ProductSearchBar() {
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
          className="h-14 w-full border-0 bg-white pl-12 pr-4 text-sm font-medium text-gray-500 placeholder:text-gray-400 focus:outline-none"
          placeholder="Pesquisar produtos"
          readOnly
          type="text"
        />
      </div>

      <button
        className="inline-flex h-14 shrink-0 items-center justify-center gap-2 border-l border-gray-200 px-4 text-sm font-semibold text-gray-500 sm:px-6"
        type="button"
      >
        <ListFilter aria-hidden="true" size={20} strokeWidth={2.2} />
        Filtrar
      </button>
    </div>
  )
}
