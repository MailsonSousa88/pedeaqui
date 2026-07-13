import type { StorefrontCategory } from '../types/storefront'

type CategoryChipsProps = {
  categories?: StorefrontCategory[]
}

export function CategoryChips({ categories = [] }: CategoryChipsProps) {
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
      {categories.map((category, index) => (
        <span
          className={[
            'inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border px-7 text-sm font-bold uppercase',
            index === 0
              ? 'border-[#e30507] bg-[#fff0f0] text-[#e30507]'
              : 'border-gray-200 bg-white text-[#6b7280]',
          ].join(' ')}
          key={category.id}
        >
          {category.name}
        </span>
      ))}
    </div>
  )
}
