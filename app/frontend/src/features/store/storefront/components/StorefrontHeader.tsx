import { ArrowLeft, ShoppingCart } from 'lucide-react'

type StorefrontHeaderProps = {
  onBackToStores: () => void
  onOpenCart: () => void
}

export function StorefrontHeader({ onBackToStores, onOpenCart }: StorefrontHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <button
          aria-label="Voltar para a lista de lojas"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 text-sm font-semibold text-[#111111] transition-all hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
          onClick={onBackToStores}
          type="button"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          <span className="hidden sm:inline">Voltar para lojas</span>
        </button>

        <img
          alt="PedeAqui"
          className="h-10 w-auto max-w-[140px] object-contain"
          src="/logoPedeAqui.jpeg"
        />

        <button
          aria-label="Abrir carrinho"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 text-sm font-semibold text-[#111111] transition-all hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
          onClick={onOpenCart}
          type="button"
        >
          <ShoppingCart aria-hidden="true" size={19} />
          <span className="hidden sm:inline">Carrinho</span>
        </button>
      </div>
    </header>
  )
}
