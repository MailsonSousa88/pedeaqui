import type {
  ProductDetailViewModel,
  ProductPublicDetail,
  PublicCategoryDto,
  PublicProductDto,
  PublicStoreDto,
} from '../types/productDetail'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

export const normalizeProductQuantity = (value: string | number): number => {
  const parsedValue =
    typeof value === 'number' ? value : value.trim() ? Number(value) : Number.NaN

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return 1
  }

  return Math.max(1, Math.trunc(parsedValue))
}

const formatDetailValue = (value: unknown): string | null => {
  if (typeof value === 'string') {
    const normalizedValue = value.trim()
    return normalizedValue || null
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  if (typeof value === 'boolean') {
    return value ? 'Sim' : 'Não'
  }

  if (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => ['string', 'number', 'boolean'].includes(typeof item))
  ) {
    return value.map((item) => String(item)).join(', ')
  }

  return null
}

export const formatPrice = (priceCents: number) =>
  currencyFormatter.format(priceCents / 100)

export const getActivePromoPrice = (
  product: Pick<PublicProductDto, 'priceCents' | 'promoPriceCents' | 'promoEndsAt'>,
  now = new Date(),
): number | null => {
  const promoPrice = product.promoPriceCents

  if (
    typeof promoPrice !== 'number' ||
    !Number.isInteger(promoPrice) ||
    promoPrice <= 0 ||
    promoPrice >= product.priceCents
  ) {
    return null
  }

  if (!product.promoEndsAt) {
    return promoPrice
  }

  const promoEndTimestamp = Date.parse(product.promoEndsAt)

  if (!Number.isFinite(promoEndTimestamp) || promoEndTimestamp <= now.getTime()) {
    return null
  }

  return promoPrice
}

export const getPublicProductDetails = (
  details?: Record<string, unknown> | null,
): ProductPublicDetail[] => {
  if (!details) {
    return []
  }

  return Object.entries(details).flatMap(([key, rawValue]) => {
    const value = formatDetailValue(rawValue)

    return value ? [{ key, label: key, value }] : []
  })
}

export const createProductDetailViewModel = (
  store: PublicStoreDto,
  product: PublicProductDto,
  categories: PublicCategoryDto[],
  now = new Date(),
): ProductDetailViewModel => ({
  id: product.id,
  storeId: store.id,
  storeName: store.storeName,
  storeSlug: store.slug,
  name: product.name,
  description: product.description?.trim() || null,
  categoryName:
    categories.find((category) => category.id === product.categoryId)?.name.trim() || null,
  priceCents: product.priceCents,
  promoPriceCents: getActivePromoPrice(product, now),
  available: product.available,
  details: getPublicProductDetails(product.details),
})
