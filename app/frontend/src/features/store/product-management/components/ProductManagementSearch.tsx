import { Search } from 'lucide-react'

type ProductManagementSearchProps = {
  onSearchTermChange: (searchTerm: string) => void
  searchTerm: string
}

export function ProductManagementSearch({
  onSearchTermChange,
  searchTerm,
}: ProductManagementSearchProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#111111]" htmlFor="product-management-search">
        Buscar produto
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]">
          <Search aria-hidden="true" size={16} />
        </span>
        <input
          className="w-full rounded-xl border border-[#e5e7eb] bg-white py-3 pl-11 pr-4 text-sm text-[#111111] transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
          id="product-management-search"
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Busque pelo nome do produto"
          type="search"
          value={searchTerm}
        />
      </div>
    </div>
  )
}
