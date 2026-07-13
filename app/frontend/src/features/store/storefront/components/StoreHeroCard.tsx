import { motion } from 'framer-motion'
import { Link2, Pencil } from 'lucide-react'

import type { StorefrontEditValues, StorefrontStore } from '../types/storefront'
import { ImagePlaceholder } from './ImagePlaceholder'
import { StoreEditForm } from './StoreEditForm'
import { StoreInfoList } from './StoreInfoList'

type StoreHeroCardProps = {
  canEdit: boolean
  isEditing: boolean
  isLoading: boolean
  isSaving: boolean
  onCancelEditing: () => void
  onEdit: () => void
  onSave: (values: StorefrontEditValues) => Promise<boolean>
  saveError: string | null
  store: StorefrontStore | null
}

export function StoreHeroCard({
  canEdit,
  isEditing,
  isLoading,
  isSaving,
  onCancelEditing,
  onEdit,
  onSave,
  saveError,
  store,
}: StoreHeroCardProps) {
  return (
    <section
      aria-labelledby="storefront-hero-title"
      aria-busy={isLoading}
      className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="relative">
        <ImagePlaceholder label="Banner da loja ainda sem imagem" variant="banner" />

        <div className="absolute -bottom-14 left-5 sm:left-8">
          <ImagePlaceholder
            alt={store ? `Logo da loja ${store.storeName}` : undefined}
            label="Imagem de perfil da loja ainda sem imagem"
            src={store?.logoUrl}
            tone="brand"
            variant="avatar"
          />
        </div>
      </div>

      <div className="px-5 pb-6 pt-20 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1 space-y-3">
            {store ? (
              <h1
                id="storefront-hero-title"
                className="break-words text-2xl font-bold leading-tight text-[#111111] md:text-3xl"
              >
                {store.storeName}
              </h1>
            ) : (
              <>
                <div
                  aria-hidden="true"
                  className={`h-8 w-56 max-w-full rounded-full bg-gray-100 ${isLoading ? 'animate-pulse' : ''}`}
                />
                <h1 id="storefront-hero-title" className="sr-only">
                  Vitrine da loja
                </h1>
              </>
            )}

            {store?.descricao ? (
              <p className="max-w-2xl whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-600 md:text-base">
                {store.descricao}
              </p>
            ) : (
              <div className="space-y-2" aria-label="Descrição da loja ainda não informada">
                <div
                  aria-hidden="true"
                  className={`h-4 w-full max-w-sm rounded-full bg-gray-100 ${isLoading ? 'animate-pulse' : ''}`}
                />
                <div
                  aria-hidden="true"
                  className={`h-4 w-3/4 max-w-xs rounded-full bg-gray-100 ${isLoading ? 'animate-pulse' : ''}`}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:shrink-0">
            <motion.button
              aria-pressed={isEditing}
              className="inline-flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-4 text-sm font-semibold text-[#111111] shadow-sm transition-all hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!canEdit || isEditing}
              onClick={onEdit}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              type="button"
              whileHover={canEdit && !isEditing ? { scale: 1.03 } : undefined}
              whileTap={canEdit && !isEditing ? { scale: 0.97 } : undefined}
            >
              <Pencil aria-hidden="true" size={24} strokeWidth={2.2} />
              {isEditing ? 'Editando' : 'Editar'}
            </motion.button>

            <button
              aria-disabled="true"
              className="inline-flex min-h-24 cursor-not-allowed flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-4 text-sm font-semibold text-gray-400 shadow-sm"
              disabled
              type="button"
            >
              <Link2 aria-hidden="true" size={24} strokeWidth={2.2} />
              Copiar link
            </button>
          </div>
        </div>

        {isEditing && store ? (
          <StoreEditForm
            errorMessage={saveError}
            isSaving={isSaving}
            onCancel={onCancelEditing}
            onSave={onSave}
            store={store}
          />
        ) : (
          <StoreInfoList isLoading={isLoading} store={store} />
        )}
      </div>
    </section>
  )
}
