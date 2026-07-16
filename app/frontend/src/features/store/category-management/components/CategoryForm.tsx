import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Package, Save, Tags, X } from 'lucide-react'

import { PrimaryButton } from '../../../../shared/components/PrimaryButton'
import { SecondaryButton } from '../../../../shared/components/SecondaryButton'
import type {
  CategoryManagementFormValues,
  CategoryManagementHandlers,
  CategoryManagementItem,
} from '../types/categoryManagement'

type CategoryFormProps = Pick<
  CategoryManagementHandlers,
  'onCancelEditCategory' | 'onCategoryNameChange' | 'onSaveCategory'
> & {
  editingCategory: CategoryManagementItem | null
  errorMessage: string | null
  formValues: CategoryManagementFormValues
}

export function CategoryForm({
  editingCategory,
  errorMessage,
  formValues,
  onCancelEditCategory,
  onCategoryNameChange,
  onSaveCategory,
}: CategoryFormProps) {
  const categoryNameDescriptionId = 'category-name-description'
  const categoryNameErrorId = 'category-name-error'
  const categoryNameDescribedBy = errorMessage
    ? `${categoryNameDescriptionId} ${categoryNameErrorId}`
    : categoryNameDescriptionId

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSaveCategory()
  }

  return (
    <AnimatePresence>
      {editingCategory ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onCancelEditCategory}
          />

          <motion.form
            animate={{ opacity: 1, scale: 1 }}
            aria-labelledby="edit-category-modal-title"
            aria-modal="true"
            className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
            exit={{ opacity: 0, scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            role="dialog"
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff0f0] text-[#e30507]">
                  <Tags aria-hidden="true" size={21} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#e30507]">
                    Categoria
                  </p>
                  <h3 id="edit-category-modal-title" className="text-xl font-black text-[#111111]">
                    Editar categoria
                  </h3>
                  <p id={categoryNameDescriptionId} className="mt-1 text-sm leading-6 text-[#6b7280]">
                    Ajuste o nome da categoria selecionada. A alteração será salva na sua loja.
                  </p>
                </div>
              </div>

              <SecondaryButton
                aria-label="Fechar modal de edição de categoria"
                className="text-gray-500"
                onClick={onCancelEditCategory}
                size="icon"
                type="button"
              >
                <X aria-hidden="true" size={18} />
              </SecondaryButton>
            </div>

            <div className="flex flex-col gap-5 p-5">
              <div className="rounded-2xl bg-[#f5f5f5] p-4">
                <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#e30507]">
                  <Package aria-hidden="true" size={18} />
                </span>
                <p className="text-xs font-semibold uppercase text-gray-500">Categoria atual</p>
                <strong className="mt-1 block truncate text-lg font-black text-[#111111]">
                  {editingCategory.name}
                </strong>
                <p className="mt-1 text-sm text-gray-500">
                  {editingCategory.productCount} produto(s) vinculados
                </p>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-[#111111]">Novo nome da categoria</span>
                <span className="relative">
                  <Tags
                    aria-hidden="true"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
                    size={16}
                  />
                  <input
                    aria-describedby={categoryNameDescribedBy}
                    aria-invalid={Boolean(errorMessage)}
                    autoComplete="off"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm uppercase text-[#111111] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
                    maxLength={32}
                    onChange={(event) => onCategoryNameChange(event.target.value)}
                    placeholder="Ex: Bebidas"
                    type="text"
                    value={formValues.name}
                  />
                </span>
                {errorMessage ? (
                  <span
                    id={categoryNameErrorId}
                    className="text-xs font-medium text-red-600"
                    role="alert"
                  >
                    {errorMessage}
                  </span>
                ) : null}
              </label>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:justify-end">
              <SecondaryButton
                className="w-full sm:w-fit"
                onClick={onCancelEditCategory}
                type="button"
              >
                <X aria-hidden="true" size={16} />
                Cancelar
              </SecondaryButton>
              <PrimaryButton className="w-full sm:w-fit" type="submit">
                <Save aria-hidden="true" size={16} />
                Salvar edição
              </PrimaryButton>
            </div>
          </motion.form>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
