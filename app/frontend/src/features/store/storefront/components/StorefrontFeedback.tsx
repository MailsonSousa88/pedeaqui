import { AlertCircle, Store } from 'lucide-react'

import type { StorefrontLoadStatus } from '../types/storefront'

type StorefrontFeedbackProps = {
  onBackToStores: () => void
  onRetry: () => void
  status: Extract<StorefrontLoadStatus, 'missing' | 'unavailable' | 'error'>
}

export function StorefrontFeedback({
  onBackToStores,
  onRetry,
  status,
}: StorefrontFeedbackProps) {
  const isError = status === 'error'
  const title = isError ? 'Não foi possível carregar a loja' : 'Loja indisponível'
  const description = isError
    ? 'Tivemos uma falha temporária. Tente novamente em alguns instantes.'
    : 'Esta loja não existe ou não está disponível para acesso público.'

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center px-4 py-10 sm:px-6">
      <section className="w-full rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#fff0f0] text-[#e30507]">
          {isError ? <AlertCircle aria-hidden="true" size={26} /> : <Store aria-hidden="true" size={26} />}
        </span>
        <h1 className="mt-5 text-2xl font-bold text-[#111111]">{title}</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-[#6b7280]">{description}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          {isError ? (
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#e30507] px-5 text-sm font-semibold text-white hover:bg-[#b80406] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
              onClick={onRetry}
              type="button"
            >
              Tentar novamente
            </button>
          ) : null}
          <button
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-gray-300 bg-white px-5 text-sm font-semibold text-[#111111] hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
            onClick={onBackToStores}
            type="button"
          >
            Ver outras lojas
          </button>
        </div>
      </section>
    </main>
  )
}
