import { Boxes, CheckCircle2, Hash } from 'lucide-react'

import type { ProductStockMode } from '../types/productManagement'

type ProductStockSectionProps = {
  onStockModeChange: (mode: ProductStockMode) => void
  stockMode: ProductStockMode
}

export function ProductStockSection({ onStockModeChange, stockMode }: ProductStockSectionProps) {
  const isControlled = stockMode === 'controlled'

  return (
    <section className="flex flex-col gap-4" aria-labelledby="product-stock-title">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0f0] text-[#e30507]">
          <Boxes aria-hidden="true" size={20} />
        </span>
        <div>
          <h4 id="product-stock-title" className="text-base font-bold text-[#111111]">
            Estoque
          </h4>
          <p className="text-sm leading-6 text-[#6b7280]">
            Seleção visual do tipo de estoque. A regra real será conectada quando o backend
            estiver pronto.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          aria-pressed={stockMode === 'free'}
          className={[
            'flex min-h-24 items-start gap-3 rounded-2xl border p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2',
            stockMode === 'free'
              ? 'border-[#16a34a] bg-[#f0fdf4] text-[#111111]'
              : 'border-gray-200 bg-white text-[#111111] hover:border-[#e30507]/60',
          ].join(' ')}
          onClick={() => onStockModeChange('free')}
          type="button"
        >
          {stockMode === 'free' ? (
            <CheckCircle2 aria-hidden="true" className="mt-0.5 text-[#16a34a]" size={20} />
          ) : (
            <Boxes aria-hidden="true" className="mt-0.5 text-[#e30507]" size={20} />
          )}
          <span className="flex flex-col gap-1">
            <span className="text-sm font-bold">Estoque livre</span>
            <span className="text-xs leading-5 text-[#6b7280]">
              O produto fica disponível enquanto estiver marcado para venda.
            </span>
          </span>
        </button>

        <button
          aria-pressed={stockMode === 'controlled'}
          className={[
            'flex min-h-24 items-start gap-3 rounded-2xl border p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2',
            stockMode === 'controlled'
              ? 'border-[#16a34a] bg-[#f0fdf4] text-[#111111]'
              : 'border-gray-200 bg-white text-[#111111] hover:border-[#e30507]/60',
          ].join(' ')}
          onClick={() => onStockModeChange('controlled')}
          type="button"
        >
          {stockMode === 'controlled' ? (
            <CheckCircle2 aria-hidden="true" className="mt-0.5 text-[#16a34a]" size={20} />
          ) : (
            <Boxes aria-hidden="true" className="mt-0.5 text-[#e30507]" size={20} />
          )}
          <span className="flex flex-col gap-1">
            <span className="text-sm font-bold">Estoque controlado</span>
            <span className="text-xs leading-5 text-[#6b7280]">
              Prepara um campo de quantidade para integração futura.
            </span>
          </span>
        </button>
      </div>

      {isControlled ? (
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-[#111111]">Quantidade inicial</span>
          <span className="relative">
            <Hash
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
              size={16}
            />
            <input
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-[#111111] placeholder:text-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#e30507]"
              inputMode="numeric"
              placeholder="0"
              type="text"
            />
          </span>
        </label>
      ) : null}
    </section>
  )
}
