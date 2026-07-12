import { Edit3, Lock, Package, Trash2 } from 'lucide-react'

import { SecondaryButton } from '../../../../shared/components/SecondaryButton'
import type {
  CategoryManagementHandlers,
  CategoryManagementItem,
} from '../types/categoryManagement'

type CategoryCardProps = Pick<
  CategoryManagementHandlers,
  'onEditCategory' | 'onRemoveCategory'
> & {
  category: CategoryManagementItem
}

export function CategoryCard({ category, onEditCategory, onRemoveCategory }: CategoryCardProps) {
  const isSystemCategory = category.kind === 'system'
  const titleId = `category-card-${category.id}-title`

  return (
    <article
      aria-labelledby={titleId}
      className={[
        'flex min-h-36 flex-col justify-between gap-5 rounded-2xl border bg-white p-5 shadow-sm transition-all',
        isSystemCategory
          ? 'border-[#e30507] ring-1 ring-[#e30507]/15'
          : 'border-gray-100 hover:border-[#e30507]/40 hover:shadow-md',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span
            className={[
              'mb-3 inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase',
              isSystemCategory ? 'bg-[#e30507] text-white' : 'bg-[#fff0f0] text-[#e30507]',
            ].join(' ')}
          >
            {isSystemCategory ? 'Padrão' : 'Categoria'}
          </span>
          <h3 id={titleId} className="truncate text-lg font-bold text-[#111111]">
            {category.name}
          </h3>
        </div>

        <span
          className={[
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            isSystemCategory ? 'bg-[#fff0f0] text-[#e30507]' : 'bg-gray-100 text-gray-600',
          ].join(' ')}
        >
          {isSystemCategory ? (
            <Lock aria-hidden="true" size={18} />
          ) : (
            <Package aria-hidden="true" size={18} />
          )}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
        <div>
          <span className="block text-xs font-medium text-gray-500">Produtos vinculados</span>
          <strong className="text-xl font-bold text-[#111111]">{category.productCount}</strong>
        </div>

        {isSystemCategory ? (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
            Fixa
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <SecondaryButton
              aria-label={`Editar categoria ${category.name}`}
              className="text-gray-600"
              onClick={() => onEditCategory(category.id)}
              size="icon"
              type="button"
            >
              <Edit3 aria-hidden="true" size={17} />
            </SecondaryButton>
            <SecondaryButton
              aria-label={`Ação visual de remover categoria ${category.name}`}
              className="text-gray-600"
              onClick={() => onRemoveCategory(category.id)}
              size="icon"
              type="button"
            >
              <Trash2 aria-hidden="true" size={17} />
            </SecondaryButton>
          </div>
        )}
      </div>
    </article>
  )
}
