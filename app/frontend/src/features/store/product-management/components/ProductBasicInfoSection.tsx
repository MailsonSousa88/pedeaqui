import { useState } from 'react'
import { CircleDollarSign, FileText, Package, ToggleLeft, ToggleRight } from 'lucide-react'

import type { ProductManagementFormMode } from '../types/productManagement'
import { formatCurrencyInput } from '../utils/currencyInput'

type ProductBasicInfoSectionProps = {
  initialAvailable?: boolean
  initialDescription?: string | null
  initialName?: string
  initialPrice?: string
  mode?: ProductManagementFormMode
}

export function ProductBasicInfoSection({
  initialAvailable = true,
  initialDescription = '',
  initialName = '',
  initialPrice = '',
  mode = 'create',
}: ProductBasicInfoSectionProps) {
  const [basePrice, setBasePrice] = useState(initialPrice)
  const [description, setDescription] = useState(initialDescription ?? '')
  const [isAvailable, setIsAvailable] = useState(initialAvailable)
  const [name, setName] = useState(initialName)
  const isEditMode = mode === 'edit'

  return (
    <section className="flex flex-col gap-4" aria-labelledby="product-basic-info-title">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0f0] text-[#e30507]">
          <Package aria-hidden="true" size={20} />
        </span>
        <div>
          <h4 id="product-basic-info-title" className="text-base font-bold text-[#111111]">
            Informações básicas
          </h4>
          <p className="text-sm leading-6 text-[#6b7280]">
            Dados principais que identificam o produto na vitrine.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-sm font-semibold text-[#111111]">Nome do produto</span>
          <span className="relative">
            <Package
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
              size={16}
            />
            <input
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
              name="name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex: X-Burguer artesanal"
              type="text"
              value={name}
            />
          </span>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#111111]">Preço base</span>
          <span className="relative">
            <CircleDollarSign
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
              size={16}
            />
            <input
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
              inputMode="numeric"
              name="price"
              onChange={(event) => setBasePrice(formatCurrencyInput(event.target.value))}
              placeholder="0,00"
              type="text"
              value={basePrice}
            />
          </span>
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#111111]">Disponível para venda</span>
          <button
            aria-pressed={isAvailable}
            className={[
              'flex min-h-11 items-center gap-3 rounded-xl border bg-white px-4 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2',
              isAvailable
                ? 'border-[#16a34a] bg-[#f0fdf4] text-[#111111]'
                : 'border-gray-200 text-[#6b7280] hover:border-[#e30507]/60 hover:text-[#111111]',
              isEditMode ? 'cursor-not-allowed opacity-75' : '',
            ].join(' ')}
            onClick={() => {
              if (!isEditMode) {
                setIsAvailable((currentValue) => !currentValue)
              }
            }}
            type="button"
          >
            {isAvailable ? (
              <ToggleRight aria-hidden="true" className="text-[#16a34a]" size={20} />
            ) : (
              <ToggleLeft aria-hidden="true" className="text-[#e30507]" size={20} />
            )}
            {isAvailable ? 'Produto disponível' : 'Produto indisponível'}
          </button>
          {isEditMode && (
            <span className="text-xs leading-5 text-[#6b7280]">
              A disponibilidade deve ser alterada pela ação Pausar ou Reativar na lista.
            </span>
          )}
        </div>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-sm font-semibold text-[#111111]">Descrição</span>
          <span className="relative">
            <FileText
              aria-hidden="true"
              className="absolute left-4 top-4 text-[#e30507]"
              size={16}
            />
            <textarea
              className="min-h-28 w-full resize-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
              name="description"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descreva ingredientes, detalhes ou características do produto."
              value={description}
            />
          </span>
        </label>
      </div>
    </section>
  )
}
