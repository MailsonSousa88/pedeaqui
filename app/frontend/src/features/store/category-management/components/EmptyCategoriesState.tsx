import { Tags } from 'lucide-react'

export function EmptyCategoriesState() {
  return (
    <div
      aria-live="polite"
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-10 text-center"
      role="status"
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0f0] text-[#e30507]">
        <Tags aria-hidden="true" size={22} />
      </span>
      <h3 className="text-base font-bold text-[#111111]">Nenhuma categoria de produto ainda</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        Quando produtos forem cadastrados com categorias, elas aparecerão aqui para revisão,
        edição e remoção.
      </p>
    </div>
  )
}
