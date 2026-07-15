import { SecondaryButton } from '../../../../shared/components/SecondaryButton'
import {
  type ProductAvailabilityFilter,
  type ProductManagementFilters,
  type ProductPromotionFilter,
} from '../types/productManagement'

type ProductManagementCategoryFilterOption = {
  id: string
  label: string
}

type ProductManagementFiltersProps = {
  categoryOptions: ProductManagementCategoryFilterOption[]
  filters: ProductManagementFilters
  onAvailabilityFilterChange: (availability: ProductAvailabilityFilter) => void
  onCategoryFilterChange: (categoryId: string | null) => void
  onPromotionFilterChange: (promotion: ProductPromotionFilter) => void
  onResetFilters: () => void
}

export function ProductManagementFilters({
  categoryOptions,
  filters,
  onAvailabilityFilterChange,
  onCategoryFilterChange,
  onPromotionFilterChange,
  onResetFilters,
}: ProductManagementFiltersProps) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#111111]">
        Disponibilidade
        <select
          className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm font-normal text-[#111111] transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
          onChange={(event) =>
            onAvailabilityFilterChange(event.target.value as ProductAvailabilityFilter)
          }
          value={filters.availability}
        >
          <option value="all">Todos</option>
          <option value="available">Disponiveis</option>
          <option value="unavailable">Pausados</option>
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#111111]">
        Categoria
        <select
          className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm font-normal text-[#111111] transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
          onChange={(event) => onCategoryFilterChange(event.target.value || null)}
          value={filters.categoryId ?? ''}
        >
          <option value="">Todos</option>
          {categoryOptions.map((categoryOption) => (
            <option key={categoryOption.id} value={categoryOption.id}>
              {categoryOption.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#111111]">
        Promoção
        <select
          className="rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm font-normal text-[#111111] transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
          onChange={(event) => onPromotionFilterChange(event.target.value as ProductPromotionFilter)}
          value={filters.promotion}
        >
          <option value="all">Todos</option>
          <option value="promotion">Em promoção</option>
          <option value="regular">Sem promoção</option>
        </select>
      </label>

      <div className="flex items-end">
        <SecondaryButton
          className="w-full px-4"
          onClick={onResetFilters}
          type="button"
        >
          Limpar filtros
        </SecondaryButton>
      </div>
    </div>
  )
}
