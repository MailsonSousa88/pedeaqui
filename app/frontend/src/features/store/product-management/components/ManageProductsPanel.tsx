import { AlertCircle, ArrowLeft, Loader2, PackageSearch, RefreshCw } from 'lucide-react'

import { PrimaryButton } from '../../../../shared/components/PrimaryButton'
import { SecondaryButton } from '../../../../shared/components/SecondaryButton'
import {
  type ManageProductListItem,
  type ProductAvailabilityFilter,
  type ProductManagementActionState,
  type ProductManagementAsyncStatus,
  type ProductManagementError,
  type ProductManagementFilters as ProductManagementFilterValues,
  type ProductManagementProductActionHandlers,
  type ProductPromotionFilter,
} from '../types/productManagement'
import { ManagedProductList } from './ManagedProductList'
import { ProductManagementFilters } from './ProductManagementFilters'
import { ProductManagementSearch } from './ProductManagementSearch'

type ManageProductsPanelProps = Partial<ProductManagementProductActionHandlers> & {
  action: ProductManagementActionState
  emptyProductsMessage: string
  filteredProducts: ManageProductListItem[]
  filters: ProductManagementFilterValues
  hasStoreId: boolean
  listError: ProductManagementError | null
  listStatus: ProductManagementAsyncStatus
  onAvailabilityFilterChange: (availability: ProductAvailabilityFilter) => void
  onBack: () => void
  onCategoryFilterChange: (categoryId: string | null) => void
  onPromotionFilterChange: (promotion: ProductPromotionFilter) => void
  onRetry: () => void
  onSearchTermChange: (searchTerm: string) => void
  onResetFilters: () => void
  products: ManageProductListItem[]
}

const createCategoryOptions = (products: ManageProductListItem[]) => {
  const categoryMap = new Map<string, string>()

  products.forEach((product) => {
    if (!product.categoryId) {
      return
    }

    categoryMap.set(product.categoryId, product.categoryLabel ?? 'Categoria sem nome')
  })

  return Array.from(categoryMap, ([id, label]) => ({ id, label }))
}

const noopProductAction = () => undefined

export function ManageProductsPanel({
  action,
  emptyProductsMessage,
  filteredProducts,
  filters,
  hasStoreId,
  listError,
  listStatus,
  onAvailabilityFilterChange,
  onBack,
  onCategoryFilterChange,
  onEditProduct = noopProductAction,
  onPromotionFilterChange,
  onRemoveProduct = noopProductAction,
  onRetry,
  onSearchTermChange,
  onResetFilters,
  onToggleAvailability = noopProductAction,
  products,
}: ManageProductsPanelProps) {
  const categoryOptions = createCategoryOptions(products)
  const isLoading = listStatus === 'loading'
  const isError = listStatus === 'error'
  const isEmpty = listStatus === 'success' && filteredProducts.length === 0
  const hasProducts = listStatus === 'success' && filteredProducts.length > 0

  return (
    <div
      className="flex flex-col gap-5 rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8"
      role="region"
      aria-labelledby="manage-products-panel-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-wide text-[#e30507]">
            Gerenciar produtos
          </p>
          <h3
            id="manage-products-panel-title"
            className="text-xl font-bold leading-tight text-[#111111]"
          >
            Produtos cadastrados
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-[#6b7280]">
            Encontre produtos existentes por nome, disponibilidade, categoria ou promoção.
          </p>
        </div>

        <SecondaryButton
          className="w-full px-4 sm:w-auto"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Voltar para cards
        </SecondaryButton>
      </div>

      <div className="flex flex-col gap-4">
        <ProductManagementSearch
          onSearchTermChange={onSearchTermChange}
          searchTerm={filters.searchTerm}
        />

        <ProductManagementFilters
          categoryOptions={categoryOptions}
          filters={filters}
          onAvailabilityFilterChange={onAvailabilityFilterChange}
          onCategoryFilterChange={onCategoryFilterChange}
          onPromotionFilterChange={onPromotionFilterChange}
          onResetFilters={onResetFilters}
        />
      </div>

      {action.status === 'error' && action.error ? (
        <div className="flex gap-3 rounded-xl border border-[#dc2626]/20 bg-red-50 p-4">
          <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0 text-[#dc2626]" size={18} />
          <p className="text-sm leading-6 text-[#dc2626]">{action.error.message}</p>
        </div>
      ) : null}

      {isLoading && (
        <div className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-[#f5f5f5] p-4 text-sm font-medium text-[#6b7280]">
          <Loader2 aria-hidden="true" className="animate-spin text-[#e30507]" size={18} />
          Carregando produtos da loja...
        </div>
      )}

      {isError && (
        <div className="flex flex-col gap-4 rounded-xl border border-[#dc2626]/20 bg-red-50 p-4">
          <div className="flex gap-3">
            <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0 text-[#dc2626]" size={18} />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-[#111111]">
                {hasStoreId ? 'Não foi possível carregar os produtos.' : 'Loja não conectada.'}
              </p>
              <p className="text-sm leading-6 text-[#6b7280]">
                {listError?.message ?? emptyProductsMessage}
              </p>
            </div>
          </div>

          {hasStoreId && (
            <PrimaryButton
              className="w-full px-4 sm:w-fit"
              onClick={onRetry}
              type="button"
            >
              <RefreshCw aria-hidden="true" size={16} />
              Tentar novamente
            </PrimaryButton>
          )}
        </div>
      )}

      {isEmpty && (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-[#e5e7eb] bg-[#f5f5f5] p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f0] text-[#e30507]">
            <PackageSearch aria-hidden="true" size={20} />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-[#111111]">Nenhum produto encontrado</p>
            <p className="text-sm leading-6 text-[#6b7280]">{emptyProductsMessage}</p>
          </div>
        </div>
      )}

      {hasProducts && (
        <ManagedProductList
          action={action}
          onEditProduct={onEditProduct}
          onRemoveProduct={onRemoveProduct}
          onToggleAvailability={onToggleAvailability}
          products={filteredProducts}
        />
      )}
    </div>
  )
}
