import { useState } from 'react'
import { CircleDollarSign, ListPlus, SlidersHorizontal } from 'lucide-react'

import { formatCurrencyInput } from '../utils/currencyInput'

export function ProductVariationSection() {
  const [priceModifier, setPriceModifier] = useState('')

  return (
    <section className="flex flex-col gap-4" aria-labelledby="product-variation-title">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0f0] text-[#e30507]">
          <SlidersHorizontal aria-hidden="true" size={20} />
        </span>
        <div>
          <h4 id="product-variation-title" className="text-base font-bold text-[#111111]">
            Variações
          </h4>
          <p className="text-sm leading-6 text-[#6b7280]">
            Estrutura visual para escolhas como tamanho, sabor ou cor. A persistência real será
            conectada depois.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-[#f5f5f5] p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-sm font-semibold text-[#111111]">Nome da variação</span>
            <span className="relative">
              <SlidersHorizontal
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
                size={16}
              />
              <input
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
                placeholder="Ex: Tamanho"
                type="text"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#111111]">Opção</span>
            <span className="relative">
              <ListPlus
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
                size={16}
              />
              <input
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
                placeholder="Ex: Grande"
                type="text"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#111111]">Acréscimo ou desconto</span>
            <span className="relative">
              <CircleDollarSign
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
                size={16}
              />
              <input
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
                inputMode="numeric"
                onChange={(event) => setPriceModifier(formatCurrencyInput(event.target.value))}
                placeholder="0,00"
                type="text"
                value={priceModifier}
              />
            </span>
          </label>
        </div>

        <p className="mt-3 text-xs leading-5 text-[#6b7280]">
          Esta primeira versão mostra uma variação elementar. Adicionar múltiplas opções e salvar
          no backend ficará para integração futura.
        </p>
      </div>
    </section>
  )
}
