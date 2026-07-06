import { CategoryForm } from '../components/CategoryForm'
import { CategoryList } from '../components/CategoryList'
import { useCategoryManagement } from '../hooks/useCategoryManagement'

export function CategoryManagementPage() {
  const {
    categories,
    editingCategoryId,
    errorMessage,
    formValues,
    onCancelEditCategory,
    onCategoryNameChange,
    onEditCategory,
    onRemoveCategory,
    onSaveCategory,
  } = useCategoryManagement()
  const editingCategory =
    categories.find((category) => category.id === editingCategoryId) ?? null

  return (
    <section className="flex flex-col gap-5" aria-labelledby="category-management-title">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-[#e30507]">
          Gestão de categorias
        </p>
        <h2 id="category-management-title" className="text-2xl font-black text-[#111111]">
          Categorias da loja
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-[#6b7280]">
          Organize as categorias que nasceram no cadastro dos produtos. A criação continua dentro
          do produto; aqui ficam edição, revisão e remoção visual das categorias existentes.
        </p>
      </div>

      <CategoryForm
        editingCategory={editingCategory}
        errorMessage={errorMessage}
        formValues={formValues}
        onCancelEditCategory={onCancelEditCategory}
        onCategoryNameChange={onCategoryNameChange}
        onSaveCategory={onSaveCategory}
      />

      <CategoryList
        categories={categories}
        onEditCategory={onEditCategory}
        onRemoveCategory={onRemoveCategory}
      />
    </section>
  )
}
