import {
  CheckCircle,
  Edit3,
  Loader2,
  PauseCircle,
  PlayCircle,
  Tag,
  Trash2,
  XCircle,
} from 'lucide-react'

import {
  type ManageProductListItem,
  type ProductManagementActionState,
} from '../types/productManagement'

type ManagedProductCardProps = {
  action: ProductManagementActionState
  onEditProduct: (product: ManageProductListItem) => void
  onRemoveProduct: (product: ManageProductListItem) => void
  onToggleAvailability: (product: ManageProductListItem) => void
  product: ManageProductListItem
}

const formatPrice = (priceCents: number) =>
  new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(priceCents / 100)

const formatDate = (date?: string) => {
  if (!date) {
    return null
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat('pt-BR').format(parsedDate)
}

export function ManagedProductCard({
  action,
  onEditProduct,
  onRemoveProduct,
  onToggleAvailability,
  product,
}: ManagedProductCardProps) {
  const hasPromotion = Boolean(product.promoPriceCents)
  const isActionLoading = action.status === 'loading' && action.productId === product.id
  const updatedAt = formatDate(product.updatedAt)

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="min-w-0 break-words text-base font-bold leading-snug text-[#111111]">
                {product.name}
              </h4>

              {product.available ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                  <CheckCircle aria-hidden="true" size={12} />
                  Disponível
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                  <XCircle aria-hidden="true" size={12} />
                  Pausado
                </span>
              )}

              {hasPromotion && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  <Tag aria-hidden="true" size={12} />
                  Em promoção
                </span>
              )}
            </div>

            {product.description && (
              <p className="line-clamp-2 break-words text-sm leading-6 text-[#6b7280]">
                {product.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                Preço
              </span>
              <span className="font-bold text-[#111111]">{formatPrice(product.priceCents)}</span>
            </div>

            {product.promoPriceCents ? (
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                  Promocional
                </span>
                <span className="font-bold text-[#e30507]">
                  {formatPrice(product.promoPriceCents)}
                </span>
              </div>
            ) : null}

            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                Categoria
              </span>
              <span className="font-medium text-[#111111]">
                {product.categoryLabel ?? 'Categoria sem nome'}
              </span>
            </div>

            {updatedAt && (
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                  Atualizado
                </span>
                <span className="font-medium text-[#111111]">{updatedAt}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 lg:min-w-80">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-[#111111] transition-all hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isActionLoading}
            onClick={() => onEditProduct(product)}
            type="button"
          >
            <Edit3 aria-hidden="true" size={16} />
            Editar
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-[#111111] transition-all hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isActionLoading}
            onClick={() => onToggleAvailability(product)}
            type="button"
          >
            {isActionLoading ? (
              <Loader2 aria-hidden="true" className="animate-spin" size={16} />
            ) : product.available ? (
              <PauseCircle aria-hidden="true" size={16} />
            ) : (
              <PlayCircle aria-hidden="true" size={16} />
            )}
            {product.available ? 'Pausar' : 'Reativar'}
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dc2626]/30 px-4 py-3 text-sm font-semibold text-[#dc2626] transition-all hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isActionLoading}
            onClick={() => onRemoveProduct(product)}
            type="button"
          >
            <Trash2 aria-hidden="true" size={16} />
            Remover
          </button>
        </div>
      </div>
    </article>
  )
}
