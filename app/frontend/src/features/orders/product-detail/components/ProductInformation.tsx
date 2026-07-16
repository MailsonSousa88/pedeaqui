import { CheckCircle, PackageX } from 'lucide-react'

import type { ProductDetailViewModel } from '../types/productDetail'
import { ProductPrice } from './ProductPrice'

type ProductInformationProps = {
  product: ProductDetailViewModel
}

export function ProductInformation({ product }: ProductInformationProps) {
  return (
    <section aria-labelledby="product-name" className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        {product.categoryName ? (
          <span className="rounded-full bg-[#fff0f0] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#e30507]">
            {product.categoryName}
          </span>
        ) : null}
        {product.available ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
            <CheckCircle aria-hidden="true" size={12} />
            Disponível
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
            <PackageX aria-hidden="true" size={12} />
            Indisponível
          </span>
        )}
      </div>

      <h1 id="product-name" className="mt-4 break-words text-2xl font-bold leading-tight text-[#111111] md:text-3xl">
        {product.name}
      </h1>

      {product.description ? (
        <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
          {product.description}
        </p>
      ) : null}

      <div className="my-6 border-y border-gray-200 py-6">
        <ProductPrice
          priceCents={product.priceCents}
          promoPriceCents={product.promoPriceCents}
        />
      </div>

      {product.details.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold leading-tight text-[#111111] md:text-2xl">
            Detalhes do produto
          </h2>
          <dl className="mt-4 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white px-4">
            {product.details.map((detail) => (
              <div className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-4" key={detail.key}>
                <dt className="break-words text-sm font-semibold text-[#111111]">{detail.label}</dt>
                <dd className="break-words text-sm text-[#6b7280] sm:text-right">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {!product.available ? (
        <p className="mt-6 text-sm leading-relaxed text-[#6b7280]">
          Este produto está pausado e não pode ser adicionado ao carrinho no momento.
        </p>
      ) : null}
    </section>
  )
}
