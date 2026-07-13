import { AlertCircle, Loader2 } from 'lucide-react'

import { CategoryForm } from '../components/CategoryForm'
import { CategoryList } from '../components/CategoryList'
import { CreateCategoryForm } from '../components/CreateCategoryForm'
import { useCategoryManagement } from '../hooks/useCategoryManagement'

type CategoryManagementPageProps = {
  onCategoriesChanged?: () => void
  storeId?: string | null
}

export function CategoryManagementPage({ onCategoriesChanged, storeId }: CategoryManagementPageProps) {
  const {
    categories,
    editingCategoryId,
    errorMessage,
    formValues,
    newCategoryName,
    onCancelEditCategory,
    onCategoryNameChange,
    onCreateCategory,
    onEditCategory,
    onRemoveCategory,
    onNewCategoryNameChange,
    onSaveCategory,
    status,
  } = useCategoryManagement(storeId, onCategoriesChanged)
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
          Organize as categorias cadastradas na loja. A criação também está disponível durante o
          cadastro do produto; aqui ficam edição, revisão e remoção das categorias existentes.
        </p>
      </div>

      {status === 'loading' ? (
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-sm font-semibold text-[#6b7280]">
          <Loader2 aria-hidden="true" className="animate-spin text-[#e30507]" size={18} />
          Carregando categorias da loja...
        </div>
      ) : null}

      {errorMessage && !editingCategory ? (
        <div
          className="flex gap-3 rounded-xl border border-[#dc2626]/20 bg-red-50 p-4"
          role="alert"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 text-[#dc2626]" size={18} />
          <p className="text-sm text-[#dc2626]">{errorMessage}</p>
        </div>
      ) : null}

      {status === 'success' ? (
        <CreateCategoryForm
          errorMessage={errorMessage}
          name={newCategoryName}
          onCreate={onCreateCategory}
          onNameChange={onNewCategoryNameChange}
        />
      ) : null}

      <CategoryForm
        editingCategory={editingCategory}
        errorMessage={errorMessage}
        formValues={formValues}
        onCancelEditCategory={onCancelEditCategory}
        onCategoryNameChange={onCategoryNameChange}
        onSaveCategory={onSaveCategory}
      />

      {status !== 'loading' ? (
        <CategoryList
          categories={categories}
          onEditCategory={onEditCategory}
          onRemoveCategory={onRemoveCategory}
        />
      ) : null}
    </section>
  )
}
