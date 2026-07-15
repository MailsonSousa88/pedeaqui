import { AlertCircle, Loader2, PackageOpen, Tag } from 'lucide-react'

import type { StorefrontCatalogStatus, StorefrontProduct } from '../types/storefront'

type ProductsAreaProps = {
  emptyDescription?: string
  emptyTitle?: string
  onSelectProduct: (productId: string) => void
  products?: StorefrontProduct[]
  status?: StorefrontCatalogStatus
}

const formatPrice = (priceCents: number) =>
  new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(priceCents / 100)

export function EmptyProductsArea({
  emptyDescription = 'Os novos produtos aparecerão aqui.',
  emptyTitle = 'Nenhum produto cadastrado',
  onSelectProduct,
  products = [],
  status = 'missing',
}: ProductsAreaProps) {
  if (status === 'missing') {
    return (
      <section
        aria-label="Área de produtos da loja"
        className="flex min-h-48 items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white/70 p-6 text-center text-sm text-[#6b7280]"
      >
        Nenhuma loja foi carregada.
      </section>
    )
  }

  if (status === 'loading') {
    return (
      <section className="flex min-h-48 items-center justify-center gap-3 rounded-3xl border border-gray-200 bg-white p-6 text-sm font-semibold text-[#6b7280]">
        <Loader2 aria-hidden="true" className="animate-spin text-[#e30507]" size={20} />
        Carregando produtos da loja...
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="flex min-h-48 items-center justify-center gap-3 rounded-3xl border border-[#dc2626]/20 bg-red-50 p-6 text-sm font-semibold text-[#dc2626]">
        <AlertCircle aria-hidden="true" size={20} />
        Não foi possível carregar os produtos desta loja.
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-gray-200 bg-white/70 p-6 text-center">
        <PackageOpen aria-hidden="true" className="text-[#e30507]" size={28} />
        <div>
          <p className="font-bold text-[#111111]">{emptyTitle}</p>
          <p className="mt-1 text-sm text-[#6b7280]">{emptyDescription}</p>
        </div>
      </section>
    )
  }

  return (
    <section aria-label="Produtos da loja" className="flex flex-col gap-3">
      {products.map((product) => (
        <article
          aria-label={`Ver detalhes de ${product.name}`}
          className="flex w-full cursor-pointer flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#e30507] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 sm:flex-row sm:items-center sm:justify-between"
          key={product.id}
          onClick={() => onSelectProduct(product.id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onSelectProduct(product.id)
            }
          }}
          role="link"
          tabIndex={0}
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="break-words text-lg font-bold text-[#111111]">{product.name}</h2>
              {product.categoryLabel ? (
                <span className="rounded-full bg-[#fff0f0] px-3 py-1 text-xs font-bold uppercase text-[#e30507]">
                  {product.categoryLabel}
                </span>
              ) : null}
            </div>
            {product.description ? (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6b7280]">
                {product.description}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 items-end gap-3 sm:flex-col sm:gap-1">
            {product.promoPriceCents ? (
              <>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                  <Tag aria-hidden="true" size={12} /> Em promoção
                </span>
                <span className="text-xs text-[#6b7280] line-through">
                  {formatPrice(product.priceCents)}
                </span>
                <strong className="text-lg text-[#e30507]">
                  {formatPrice(product.promoPriceCents)}
                </strong>
              </>
            ) : (
              <strong className="text-lg text-[#111111]">{formatPrice(product.priceCents)}</strong>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}
