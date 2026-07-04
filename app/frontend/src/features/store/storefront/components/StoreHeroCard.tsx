import { Link2, Pencil } from 'lucide-react'

import { ImagePlaceholder } from './ImagePlaceholder'
import { StoreInfoList } from './StoreInfoList'

export function StoreHeroCard() {
  return (
    <section
      aria-labelledby="storefront-hero-title"
      className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="relative">
        <ImagePlaceholder label="Banner da loja ainda sem imagem" variant="banner" />

        <div className="absolute -bottom-14 left-5 sm:left-8">
          <ImagePlaceholder
            label="Imagem de perfil da loja ainda sem imagem"
            tone="brand"
            variant="avatar"
          />
        </div>
      </div>

      <div className="px-5 pb-6 pt-20 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1 space-y-3">
            <div
              aria-hidden="true"
              className="h-8 w-56 max-w-full rounded-full bg-gray-100"
            />
            <h1 id="storefront-hero-title" className="sr-only">
              Vitrine da loja
            </h1>
            <div className="space-y-2">
              <div aria-hidden="true" className="h-4 w-full max-w-sm rounded-full bg-gray-100" />
              <div aria-hidden="true" className="h-4 w-3/4 max-w-xs rounded-full bg-gray-100" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:shrink-0">
            <button
              className="inline-flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-4 text-sm font-semibold text-gray-500 shadow-sm"
              type="button"
            >
              <Pencil aria-hidden="true" size={24} strokeWidth={2.2} />
              Editar
            </button>

            <button
              className="inline-flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-4 text-sm font-semibold text-gray-500 shadow-sm"
              type="button"
            >
              <Link2 aria-hidden="true" size={24} strokeWidth={2.2} />
              Copiar link
            </button>
          </div>
        </div>

        <StoreInfoList />
      </div>
    </section>
  )
}
