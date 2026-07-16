import { useMemo, useState } from 'react'

import { CategoryChips } from '../components/CategoryChips'
import { EmptyProductsArea } from '../components/EmptyProductsArea'
import { ProductSearchBar } from '../components/ProductSearchBar'
import { StorefrontFeedback } from '../components/StorefrontFeedback'
import { StoreHeroCard } from '../components/StoreHeroCard'
import { useStorefront } from '../hooks/useStorefront'
import { useStorefrontProducts } from '../hooks/useStorefrontProducts'
import type { StorefrontSortOption } from '../types/storefront'
import {
  filterAndSortStorefrontProducts,
  paginateStorefrontProducts,
} from '../utils/catalog'

type StorefrontPageProps = {
  onBackToStores?: () => void
  onSelectProduct: (productId: string) => void
  slug?: string
}

const navigateTo = (path: string) => window.location.assign(path)

const priceToCents = (value: string) => {
  if (!value.trim()) {
    return null
  }

  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? Math.round(parsedValue * 100) : null
}

export function StorefrontPage({
  onBackToStores = () => navigateTo('/stores'),
  onSelectProduct,
  slug,
}: StorefrontPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [minimumPrice, setMinimumPrice] = useState('')
  const [maximumPrice, setMaximumPrice] = useState('')
  const [sort, setSort] = useState<StorefrontSortOption>('name-asc')
  const [requestedPage, setRequestedPage] = useState(1)
  const storefront = useStorefront(slug)
  const catalog = useStorefrontProducts(storefront.store?.id)
  const effectiveCategoryId = catalog.categories.some(
    (category) => category.id === selectedCategoryId,
  )
    ? selectedCategoryId
    : null
  const filteredProducts = useMemo(
    () =>
      filterAndSortStorefrontProducts(catalog.products, {
        categoryId: effectiveCategoryId,
        maximumPriceCents: priceToCents(maximumPrice),
        minimumPriceCents: priceToCents(minimumPrice),
        searchTerm,
        sort,
      }),
    [catalog.products, effectiveCategoryId, maximumPrice, minimumPrice, searchTerm, sort],
  )
  const catalogPage = useMemo(
    () => paginateStorefrontProducts(filteredProducts, requestedPage),
    [filteredProducts, requestedPage],
  )
  const catalogHadProducts = catalog.products.some((product) => product.available)
  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    effectiveCategoryId !== null ||
    minimumPrice.length > 0 ||
    maximumPrice.length > 0 ||
    sort !== 'name-asc'
  const resetPage = () => setRequestedPage(1)

  if (
    storefront.status === 'missing' ||
    storefront.status === 'unavailable' ||
    storefront.status === 'error'
  ) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <StorefrontFeedback
          onBackToStores={onBackToStores}
          onRetry={storefront.retry}
          status={storefront.status}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <StoreHeroCard
          canSharePublicLink={storefront.canSharePublicLink}
          copyLinkStatus={storefront.copyLinkStatus}
          isLoading={storefront.status === 'loading'}
          onSharePublicLink={storefront.sharePublicLink}
          store={storefront.store}
        />

        {storefront.status === 'success' ? (
          <section aria-labelledby="storefront-products-title" className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold leading-tight text-[#111111] md:text-2xl" id="storefront-products-title">
                Produtos
              </h2>
              <p className="mt-1 text-sm text-[#6b7280]">
                Pesquise e refine somente os produtos públicos desta loja.
              </p>
            </div>

            {catalog.status === 'success' ? (
              <>
                <CategoryChips
                  activeCategoryId={effectiveCategoryId}
                  categories={catalog.categories}
                  onCategoryChange={(categoryId) => {
                    setSelectedCategoryId(categoryId)
                    resetPage()
                  }}
                />
                <ProductSearchBar
                  hasActiveFilters={hasActiveFilters}
                  maximumPrice={maximumPrice}
                  minimumPrice={minimumPrice}
                  onClearFilters={() => {
                    setSearchTerm('')
                    setSelectedCategoryId(null)
                    setMinimumPrice('')
                    setMaximumPrice('')
                    setSort('name-asc')
                    resetPage()
                  }}
                  onMaximumPriceChange={(value) => {
                    setMaximumPrice(value)
                    resetPage()
                  }}
                  onMinimumPriceChange={(value) => {
                    setMinimumPrice(value)
                    resetPage()
                  }}
                  onSearchTermChange={(value) => {
                    setSearchTerm(value)
                    resetPage()
                  }}
                  onSortChange={(value) => {
                    setSort(value)
                    resetPage()
                  }}
                  searchTerm={searchTerm}
                  sort={sort}
                />
              </>
            ) : null}

            <EmptyProductsArea
              catalogHadProducts={catalogHadProducts}
              onPageChange={setRequestedPage}
              onRetry={catalog.retry}
              onSelectProduct={onSelectProduct}
              page={catalogPage}
              status={catalog.status}
            />
          </section>
        ) : null}
      </main>
    </div>
  )
}
