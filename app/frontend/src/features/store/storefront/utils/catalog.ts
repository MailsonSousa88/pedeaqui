import type {
  StorefrontCatalogFilters,
  StorefrontCatalogPage,
  StorefrontProduct,
} from '../types/storefront'

export const STOREFRONT_PAGE_SIZE = 20

export const normalizeCatalogText = (value: string) =>
  value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')

export const getProductPriceCents = (
  product: StorefrontProduct,
  now = Date.now(),
) => {
  const promotionIsValid =
    typeof product.promoPriceCents === 'number' &&
    product.promoPriceCents > 0 &&
    product.promoPriceCents < product.priceCents &&
    (!product.promoEndsAt || new Date(product.promoEndsAt).getTime() > now)

  return promotionIsValid ? product.promoPriceCents! : product.priceCents
}

export const filterAndSortStorefrontProducts = (
  products: StorefrontProduct[],
  filters: StorefrontCatalogFilters,
  now = Date.now(),
) => {
  const normalizedSearchTerm = normalizeCatalogText(filters.searchTerm)

  return products
    .filter((product) => {
      if (!product.available) {
        return false
      }

      const matchesSearch = normalizeCatalogText(product.name).includes(normalizedSearchTerm)
      const matchesCategory =
        filters.categoryId === null || product.categoryId === filters.categoryId
      const priceCents = getProductPriceCents(product, now)
      const matchesMinimum =
        filters.minimumPriceCents === null || priceCents >= filters.minimumPriceCents
      const matchesMaximum =
        filters.maximumPriceCents === null || priceCents <= filters.maximumPriceCents

      return matchesSearch && matchesCategory && matchesMinimum && matchesMaximum
    })
    .sort((firstProduct, secondProduct) => {
      if (filters.sort === 'name-asc') {
        return firstProduct.name.localeCompare(secondProduct.name, 'pt-BR')
      }

      if (filters.sort === 'name-desc') {
        return secondProduct.name.localeCompare(firstProduct.name, 'pt-BR')
      }

      const priceDifference =
        getProductPriceCents(firstProduct, now) - getProductPriceCents(secondProduct, now)

      return filters.sort === 'price-asc' ? priceDifference : -priceDifference
    })
}

export const paginateStorefrontProducts = (
  products: StorefrontProduct[],
  requestedPage: number,
  pageSize = STOREFRONT_PAGE_SIZE,
): StorefrontCatalogPage => {
  const pageCount = Math.max(1, Math.ceil(products.length / pageSize))
  const currentPage = Math.min(Math.max(1, requestedPage), pageCount)
  const startIndex = (currentPage - 1) * pageSize

  return {
    currentPage,
    pageCount,
    products: products.slice(startIndex, startIndex + pageSize),
    totalProducts: products.length,
  }
}
