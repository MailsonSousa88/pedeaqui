import { useMemo, useState } from 'react'
import { CirclePlus, Tags } from 'lucide-react'

import { PrimaryButton } from '../../../../shared/components/PrimaryButton'
import type {
  ProductCategoryOption,
  ProductManagementFormMode,
} from '../types/productManagement'

type ProductCategorySectionProps = {
  categories: ProductCategoryOption[]
  errorMessage?: string | null
  initialCategoryId?: string | null
  initialCategoryLabel?: string | null
  isLoading?: boolean
  mode?: ProductManagementFormMode
  onCreateCategory?: (name: string) => Promise<ProductCategoryOption | null>
}

function normalizeCategoryLabel(value: string) {
  return value.trim().replace(/\s+/g, ' ').toUpperCase()
}

export function ProductCategorySection({
  categories,
  errorMessage = null,
  initialCategoryId = null,
  initialCategoryLabel = null,
  isLoading = false,
  mode = 'create',
  onCreateCategory,
}: ProductCategorySectionProps) {
  const [categoryInput, setCategoryInput] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId ?? '')
  const [isCreating, setIsCreating] = useState(false)
  const isEditMode = mode === 'edit'

  const availableCategories = useMemo(() => {
    if (initialCategoryId && !categories.some((category) => category.id === initialCategoryId)) {
      return [
        ...categories,
        {
          id: initialCategoryId,
          kind: 'custom' as const,
          label: initialCategoryLabel ?? 'Categoria atual',
          removable: false,
        },
      ]
    }

    return categories
  }, [categories, initialCategoryId, initialCategoryLabel])

  const defaultCategory =
    availableCategories.find((category) => category.kind === 'system') ?? availableCategories[0]
  const effectiveSelectedCategoryId = selectedCategoryId || defaultCategory?.id || ''

  const normalizedCategoryInput = useMemo(
    () => normalizeCategoryLabel(categoryInput),
    [categoryInput],
  )

  const handleCreateCategory = async () => {
    if (!normalizedCategoryInput || !onCreateCategory || isCreating) {
      return
    }

    setIsCreating(true)
    try {
      const createdCategory = await onCreateCategory(normalizedCategoryInput)
      if (createdCategory) {
        setSelectedCategoryId(createdCategory.id)
        setCategoryInput('')
      }
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <section className="flex flex-col gap-4" aria-labelledby="product-category-title">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0f0] text-[#e30507]">
          <Tags aria-hidden="true" size={20} />
        </span>
        <div>
          <h4 id="product-category-title" className="text-base font-bold text-[#111111]">
            Categoria
          </h4>
          <p className="text-sm leading-6 text-[#6b7280]">
            Todo produto precisa pertencer a uma categoria real da loja.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-[#f5f5f5] p-4">
        <div className="flex flex-wrap items-center gap-2">
          {availableCategories.map((category) => (
            <span
              className={
                category.kind === 'system'
                  ? 'rounded-full bg-[#e30507] px-4 py-2 text-xs font-bold uppercase text-white'
                  : 'rounded-full border border-[#e30507]/30 bg-white px-4 py-2 text-xs font-bold uppercase text-[#e30507]'
              }
              key={category.id}
            >
              {category.label}
            </span>
          ))}
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#111111]">Categoria do produto</span>
          <select
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#111111] transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
            disabled={isLoading}
            name="categoryId"
            onChange={(event) => setSelectedCategoryId(event.target.value)}
            value={effectiveSelectedCategoryId}
          >
            <option value="">Selecione uma categoria</option>
            {availableCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#111111]">Criar nova categoria</span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <span className="relative flex-1">
              <CirclePlus
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
                size={16}
              />
              <input
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
                onChange={(event) => setCategoryInput(event.target.value)}
                placeholder="Ex: Lanches"
                type="text"
                value={categoryInput}
              />
            </span>
            <PrimaryButton
              disabled={!onCreateCategory || isCreating || isLoading}
              onClick={() => void handleCreateCategory()}
              type="button"
            >
              <CirclePlus aria-hidden="true" size={16} />
              {isCreating ? 'Criando...' : 'Adicionar'}
            </PrimaryButton>
          </div>
          {errorMessage ? (
            <span className="text-xs font-medium text-[#dc2626]" role="alert">
              {errorMessage}
            </span>
          ) : (
            <span className="text-xs leading-5 text-[#6b7280]">
              {isLoading
                ? 'Carregando categorias da loja...'
                : isEditMode
                  ? 'Selecione uma categoria válida da sua loja.'
                  : 'A nova categoria será salva e selecionada automaticamente.'}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
