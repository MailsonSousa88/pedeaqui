import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'

type ProductGalleryPlaceholderProps = {
  currentIndex: number
  itemCount: number
  onNext: () => void
  onPrevious: () => void
}

export function ProductGalleryPlaceholder({
  currentIndex,
  itemCount,
  onNext,
  onPrevious,
}: ProductGalleryPlaceholderProps) {
  const positionLabel = `Imagem ${currentIndex + 1} de ${itemCount}`

  return (
    <section aria-label="Galeria do produto" className="min-w-0">
      <div className="relative flex aspect-square min-h-72 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 text-gray-400 shadow-sm sm:aspect-[4/3]">
        <div
          aria-label={`${positionLabel}: imagem indisponível`}
          className="flex flex-col items-center gap-4 text-center"
          role="img"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
            <ImageIcon aria-hidden="true" size={36} strokeWidth={1.6} />
          </span>
          <div aria-live="polite">
            <p className="text-sm font-semibold text-[#6b7280]">Imagem indisponível</p>
            <p className="mt-1 text-xs text-gray-400">{positionLabel}</p>
          </div>
        </div>

        <button
          aria-label="Imagem anterior"
          className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-[#111111] shadow-sm transition-colors hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#f3f4f6] disabled:text-[#9ca3af] disabled:shadow-none"
          disabled={currentIndex === 0}
          onClick={onPrevious}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={22} />
        </button>

        <button
          aria-label="Próxima imagem"
          className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-[#111111] shadow-sm transition-colors hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#f3f4f6] disabled:text-[#9ca3af] disabled:shadow-none"
          disabled={currentIndex === itemCount - 1}
          onClick={onNext}
          type="button"
        >
          <ChevronRight aria-hidden="true" size={22} />
        </button>
      </div>

      <div aria-label="Posição atual da galeria" className="mt-4 grid grid-cols-3 gap-3">
        {Array.from({ length: itemCount }, (_, index) => (
          <div
            aria-current={index === currentIndex ? 'true' : undefined}
            className={`flex h-16 items-center justify-center rounded-xl border bg-gray-100 text-gray-400 transition-colors ${
              index === currentIndex ? 'border-[#e30507]' : 'border-gray-200'
            }`}
            key={index}
          >
            <ImageIcon aria-hidden="true" size={20} strokeWidth={1.6} />
            <span className="sr-only">Placeholder {index + 1}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
