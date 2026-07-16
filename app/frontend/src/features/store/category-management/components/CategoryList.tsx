import type {
  CategoryManagementHandlers,
  CategoryManagementItem,
} from '../types/categoryManagement'
import { CategoryCard } from './CategoryCard'
import { EmptyCategoriesState } from './EmptyCategoriesState'

type CategoryListProps = Pick<
  CategoryManagementHandlers,
  'onEditCategory' | 'onRemoveCategory'
> & {
  categories: CategoryManagementItem[]
}

export function CategoryList({ categories, onEditCategory, onRemoveCategory }: CategoryListProps) {
  const hasCustomCategories = categories.some((category) => category.kind === 'custom')

  return (
    <section className="flex flex-col gap-4" aria-labelledby="store-categories-list-title">
      <div>
        <h2 id="store-categories-list-title" className="text-lg font-bold text-[#111111]">
          Categorias da loja
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Categorias criadas a partir dos produtos aparecem aqui para edição e remoção.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            category={category}
            key={category.id}
            onEditCategory={onEditCategory}
            onRemoveCategory={onRemoveCategory}
          />
        ))}
      </div>

      {!hasCustomCategories ? <EmptyCategoriesState /> : null}
    </section>
  )
}
