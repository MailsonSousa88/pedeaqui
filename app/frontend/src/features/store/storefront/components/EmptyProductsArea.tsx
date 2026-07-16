import { AlertCircle, ChevronLeft, ChevronRight, Loader2, PackageOpen, Tag } from 'lucide-react'

import { PrimaryButton } from '../../../../shared/components/PrimaryButton'
import type { StorefrontCatalogPage, StorefrontCatalogStatus } from '../types/storefront'
import { getProductPriceCents } from '../utils/catalog'
import { ImagePlaceholder } from './ImagePlaceholder'

type ProductsAreaProps = {
  catalogHadProducts: boolean
  onPageChange: (page: number) => void
  onRetry: () => void
  onSelectProduct: (productId: string) => void
  page: StorefrontCatalogPage
  status: StorefrontCatalogStatus
}

const formatPrice = (priceCents: number) =>
  new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(priceCents / 100)

export function EmptyProductsArea({
  catalogHadProducts,
  onPageChange,
  onRetry,
  onSelectProduct,
  page,
  status,
}: ProductsAreaProps) {
  if (status === 'missing' || status === 'loading') {
    return (
      <section
        aria-busy="true"
        aria-label="Produtos da loja carregando"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div className="h-72 animate-pulse rounded-2xl border border-gray-100 bg-white" key={index} />
        ))}
        <span className="sr-only"><Loader2 aria-hidden="true" /> Carregando produtos da loja.</span>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="flex min-h-48 flex-col items-center justify-center gap-4 rounded-2xl border border-[#dc2626]/20 bg-red-50 p-6 text-center">
        <AlertCircle aria-hidden="true" className="text-[#dc2626]" size={28} />
        <div>
          <h2 className="font-bold text-[#111111]">Não foi possível carregar os produtos</h2>
          <p className="mt-1 text-sm text-[#6b7280]">Tente novamente sem sair da loja.</p>
        </div>
        <button
          className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-[#111111] hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
          onClick={onRetry}
          type="button"
        >
          Tentar novamente
        </button>
      </section>
    )
  }

  if (page.products.length === 0) {
    return (
      <section className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-white/70 p-6 text-center">
        <PackageOpen aria-hidden="true" className="text-[#e30507]" size={30} />
        <div>
          <h2 className="font-bold text-[#111111]">
            {catalogHadProducts ? 'Nenhum produto encontrado' : 'Loja sem produtos disponíveis'}
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            {catalogHadProducts
              ? 'Ajuste a busca ou os filtros para ver outros itens.'
              : 'Esta loja ainda não possui produtos públicos para pedido.'}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section aria-label="Produtos da loja">
      <p className="mb-4 text-sm text-[#6b7280]" aria-live="polite">
        {page.totalProducts} {page.totalProducts === 1 ? 'produto encontrado' : 'produtos encontrados'}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {page.products.map((product) => {
          const effectivePrice = getProductPriceCents(product)
          const hasPromotion = effectivePrice < product.priceCents

          return (
            <article
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              key={product.id}
            >
              <ImagePlaceholder
                alt={product.imageUrl ? `Imagem do produto ${product.name}` : undefined}
                className="!h-44 !w-full !rounded-none"
                label={`Produto ${product.name} sem imagem disponível`}
                src={product.imageUrl}
                variant="product"
              />
              <div className="flex flex-1 flex-col p-5">
                {product.categoryLabel ? (
                  <span className="mb-2 w-fit rounded-full bg-[#fff0f0] px-3 py-1 text-xs font-bold text-[#e30507]">
                    {product.categoryLabel}
                  </span>
                ) : null}
                <h2 className="break-words text-lg font-semibold leading-snug text-[#111111]">
                  {product.name}
                </h2>
                {product.description ? (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6b7280]">
                    {product.description}
                  </p>
                ) : null}
                <div className="mt-auto pt-5">
                  {hasPromotion ? (
                    <div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                        <Tag aria-hidden="true" size={12} /> Em promoção
                      </span>
                      <p className="mt-1 text-xs text-[#6b7280] line-through">
                        {formatPrice(product.priceCents)}
                      </p>
                      <strong className="text-xl text-[#e30507]">{formatPrice(effectivePrice)}</strong>
                    </div>
                  ) : (
                    <strong className="text-xl text-[#111111]">{formatPrice(effectivePrice)}</strong>
                  )}
                  <PrimaryButton
                    className="mt-4 min-h-11 w-full"
                    onClick={() => onSelectProduct(product.id)}
                    type="button"
                  >
                    Ver detalhes
                  </PrimaryButton>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {page.pageCount > 1 ? (
        <nav aria-label="Paginação dos produtos" className="mt-6 flex items-center justify-center gap-3">
          <button
            aria-label="Página anterior"
            className="inline-flex size-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-[#111111] hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={page.currentPage === 1}
            onClick={() => onPageChange(page.currentPage - 1)}
            type="button"
          >
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
          <span className="text-sm font-semibold text-[#111111]">
            Página {page.currentPage} de {page.pageCount}
          </span>
          <button
            aria-label="Próxima página"
            className="inline-flex size-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-[#111111] hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={page.currentPage === page.pageCount}
            onClick={() => onPageChange(page.currentPage + 1)}
            type="button"
          >
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </nav>
      ) : null}
    </section>
  )
}
