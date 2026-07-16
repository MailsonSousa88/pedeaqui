import { Check, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

import type {
  StorefrontCopyLinkStatus,
  StorefrontStore,
} from '../types/storefront'
import { ImagePlaceholder } from './ImagePlaceholder'
import { StoreInfoList } from './StoreInfoList'

type StoreHeroCardProps = {
  canSharePublicLink: boolean
  copyLinkStatus: StorefrontCopyLinkStatus
  isLoading: boolean
  onSharePublicLink: () => Promise<void>
  store: StorefrontStore | null
}

export function StoreHeroCard({
  canSharePublicLink,
  copyLinkStatus,
  isLoading,
  onSharePublicLink,
  store,
}: StoreHeroCardProps) {
  return (
    <section
      aria-busy={isLoading}
      aria-labelledby="storefront-hero-title"
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="relative">
        <ImagePlaceholder label="Banner da loja sem imagem disponível" variant="banner" />
        <div className="absolute -bottom-14 left-5 sm:left-8">
          <ImagePlaceholder
            alt={store ? `Logo da loja ${store.storeName}` : undefined}
            label="Imagem de perfil da loja sem imagem disponível"
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
              <>
                <h1
                  className="break-words text-2xl font-bold leading-tight text-[#111111] md:text-3xl"
                  id="storefront-hero-title"
                >
                  {store.storeName}
                </h1>
                <p className="max-w-2xl whitespace-pre-wrap text-sm leading-relaxed text-[#6b7280] md:text-base">
                  {store.descricao || 'Esta loja ainda não informou uma descrição.'}
                </p>
              </>
            ) : (
              <div aria-label="Identidade da loja carregando" className="space-y-3">
                <div aria-hidden="true" className="h-8 w-56 animate-pulse rounded-full bg-gray-100" />
                <div aria-hidden="true" className="h-4 w-full max-w-md animate-pulse rounded-full bg-gray-100" />
                <h1 className="sr-only" id="storefront-hero-title">Vitrine da loja</h1>
              </div>
            )}
          </div>

          <div className="sm:shrink-0">
            <motion.button
              aria-describedby={copyLinkStatus !== 'idle' ? 'share-link-feedback' : undefined}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 text-sm font-semibold text-[#111111] transition-all hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!canSharePublicLink}
              onClick={() => void onSharePublicLink()}
              transition={{ duration: 0.2 }}
              type="button"
              whileHover={canSharePublicLink ? { scale: 1.03 } : undefined}
              whileTap={canSharePublicLink ? { scale: 0.97 } : undefined}
            >
              {copyLinkStatus === 'success' ? (
                <Check aria-hidden="true" size={19} />
              ) : (
                <Share2 aria-hidden="true" size={19} />
              )}
              Compartilhar loja
            </motion.button>
            {copyLinkStatus !== 'idle' ? (
              <p
                aria-live="polite"
                className={`mt-2 max-w-xs text-center text-xs font-semibold ${
                  copyLinkStatus === 'success' ? 'text-emerald-700' : 'text-[#dc2626]'
                }`}
                id="share-link-feedback"
                role={copyLinkStatus === 'error' ? 'alert' : 'status'}
              >
                {copyLinkStatus === 'success'
                  ? 'Loja compartilhada com sucesso.'
                  : 'Não foi possível compartilhar. Tente novamente.'}
              </p>
            ) : null}
          </div>
        </div>

        <StoreInfoList isLoading={isLoading} store={store} />
      </div>
    </section>
  )
}
