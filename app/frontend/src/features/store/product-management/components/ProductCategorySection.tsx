import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { CirclePlus, Tags } from 'lucide-react'

type VisualCategory = {
  id: string
  label: string
}

function normalizeCategoryLabel(value: string) {
  return value.trim().replace(/\s+/g, ' ').toUpperCase()
}

function createCategoryId(label: string) {
  return label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function ProductCategorySection() {
  const [categoryInput, setCategoryInput] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [visualCategories, setVisualCategories] = useState<VisualCategory[]>([])

  const normalizedCategoryInput = useMemo(
    () => normalizeCategoryLabel(categoryInput),
    [categoryInput],
  )

  const handleCreateCategory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!normalizedCategoryInput) {
      return
    }

    const nextCategoryId = createCategoryId(normalizedCategoryInput)
    const alreadyExists = visualCategories.some((category) => category.id === nextCategoryId)

    if (alreadyExists) {
      setSelectedCategoryId(nextCategoryId)
      setCategoryInput('')
      return
    }

    setVisualCategories((currentCategories) => [
      ...currentCategories,
      {
        id: nextCategoryId,
        label: normalizedCategoryInput,
      },
    ])
    setSelectedCategoryId(nextCategoryId)
    setCategoryInput('')
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
            Todo produto aparece em Todos. A categoria específica é opcional.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-[#f5f5f5] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#e30507] px-4 py-2 text-xs font-bold uppercase text-white">
            Todos
          </span>
          {visualCategories.map((category) => (
            <span
              className="rounded-full border border-[#e30507]/30 bg-white px-4 py-2 text-xs font-bold uppercase text-[#e30507]"
              key={category.id}
            >
              {category.label}
            </span>
          ))}
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#111111]">
            Categoria específica opcional
          </span>
          <select
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#111111] transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
            onChange={(event) => setSelectedCategoryId(event.target.value)}
            value={selectedCategoryId}
          >
            <option value="">Nenhuma categoria específica</option>
            {visualCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>

        <form className="flex flex-col gap-1.5" onSubmit={handleCreateCategory}>
          <span className="text-sm font-semibold text-[#111111]">Criar categoria visual</span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <span className="relative flex-1">
              <CirclePlus
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
                size={16}
              />
              <input
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
                onChange={(event) => setCategoryInput(event.target.value)}
                placeholder="Ex: Lanches"
                type="text"
                value={categoryInput}
              />
            </span>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e30507] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b80406] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
              type="submit"
            >
              <CirclePlus aria-hidden="true" size={16} />
              Adicionar
            </button>
          </div>
          <span className="text-xs leading-5 text-[#6b7280]">
            Esta categoria ainda não será salva de verdade. Por enquanto, apenas Todos permanece
            como categoria fixa.
          </span>
        </form>
      </div>
    </section>
  )
}
