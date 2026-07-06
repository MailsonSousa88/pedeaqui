import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'

import type { ProductImageSlot } from '../types/productManagement'

type ProductImagePlaceholdersProps = {
  activeImageSlot: ProductImageSlot
  onNext: () => void
  onPrevious: () => void
}

const imageSlots: ProductImageSlot[] = [1, 2, 3]

export function ProductImagePlaceholders({
  activeImageSlot,
  onNext,
  onPrevious,
}: ProductImagePlaceholdersProps) {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="product-images-title">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0f0] text-[#e30507]">
          <ImageIcon aria-hidden="true" size={20} />
        </span>
        <div>
          <h4 id="product-images-title" className="text-base font-bold text-[#111111]">
            Imagens do produto
          </h4>
          <p className="text-sm leading-6 text-[#6b7280]">
            Espaços visuais para até 3 imagens. O upload real será conectado depois.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-[#f5f5f5] p-4">
        <div className="flex items-center gap-3">
          <button
            aria-label="Ver imagem anterior"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
            onClick={onPrevious}
            type="button"
          >
            <ChevronLeft aria-hidden="true" size={18} />
          </button>

          <div className="flex min-h-44 flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#e30507]/30 bg-white text-center text-[#e30507]">
            <ImageIcon aria-hidden="true" size={36} strokeWidth={1.8} />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-[#111111]">
                Imagem {activeImageSlot} de 3
              </span>
              <span className="text-xs text-[#6b7280]">Placeholder visual do produto</span>
            </div>
          </div>

          <button
            aria-label="Ver próxima imagem"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
            onClick={onNext}
            type="button"
          >
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2" aria-label="Posição das imagens">
          {imageSlots.map((slot) => {
            const isActive = slot === activeImageSlot

            return (
              <span
                aria-label={`Imagem ${slot}${isActive ? ' ativa' : ''}`}
                className={[
                  'h-2.5 rounded-full transition-all',
                  isActive ? 'w-7 bg-[#e30507]' : 'w-2.5 bg-gray-300',
                ].join(' ')}
                key={slot}
                role="img"
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
