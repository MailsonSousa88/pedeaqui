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
  const visibleCategories = categories.filter((category) => !isAllCategory(category))
  const options = [{ id: null, name: 'Todos' }, ...visibleCategories]

  return (
    <div aria-label="Categorias da loja" className="flex min-h-12 gap-3 overflow-x-auto p-1">
      {options.map((category) => {
        const isActive = activeCategoryId === category.id

        return (
          <motion.button
            aria-pressed={isActive}
            className={[
              'inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border px-6 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2',
              isActive
                ? 'border-[#e30507] bg-[#fff0f0] text-[#e30507]'
                : 'border-gray-200 bg-white text-[#6b7280] hover:border-[#e30507] hover:text-[#e30507]',
            ].join(' ')}
            key={category.id ?? 'all'}
            onClick={() => onCategoryChange(category.id)}
            transition={{ duration: 0.2 }}
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
