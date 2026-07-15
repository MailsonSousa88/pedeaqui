import { motion } from 'framer-motion'

import type { StorefrontCategory } from '../types/storefront'

type CategoryChipsProps = {
  activeCategoryId: string | null
  categories?: StorefrontCategory[]
  onCategoryChange: (categoryId: string | null) => void
}

const isAllCategory = (category: StorefrontCategory) =>
  category.name.trim().toLocaleLowerCase('pt-BR') === 'todos'

export function CategoryChips({
  activeCategoryId,
  categories = [],
  onCategoryChange,
}: CategoryChipsProps) {
  if (categories.length === 0) {
    return (
      <div
        aria-label="Categorias da loja"
        className="flex min-h-14 items-center rounded-2xl border border-dashed border-gray-200 bg-white px-4 text-sm text-[#6b7280]"
      >
        Nenhuma categoria cadastrada.
      </div>
    )
  }

  return (
    <div
      aria-label="Categorias da loja"
      className="flex min-h-14 items-center gap-3 overflow-x-auto"
    >
      {categories.map((category) => {
        const categoryFilterId = isAllCategory(category) ? null : category.id
        const isActive = activeCategoryId === categoryFilterId

        return (
          <motion.button
            aria-pressed={isActive}
            className={[
              'inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border px-7 text-sm font-bold uppercase transition-colors',
              isActive
                ? 'border-[#e30507] bg-[#fff0f0] text-[#e30507]'
                : 'border-gray-200 bg-white text-[#6b7280] hover:border-[#e30507]/40 hover:text-[#e30507]',
            ].join(' ')}
            key={category.id}
            onClick={() => onCategoryChange(categoryFilterId)}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {category.name}
          </motion.button>
        )
      })}
    </div>
  )
}
