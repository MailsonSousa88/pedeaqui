import { SearchX, Store, TriangleAlert } from 'lucide-react'

import type { StoreListState } from '../types/storeList'

type FeedbackState = Exclude<StoreListState, { status: 'success' }>

type StoreListFeedbackProps = {
  state: FeedbackState
  onClearSearch: () => void
  onRetry?: () => void
}

function StoreListSkeleton({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={isLoading ? 'Carregando lojas' : 'Preparando lista de lojas'}
      className="flex flex-col gap-3"
    >
      {[0, 1, 2, 3].map((item) => (
        <div
          key={item}
          aria-hidden="true"
          className={`grid min-h-24 grid-cols-[4rem_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white p-3 shadow-sm ${
            isLoading ? 'animate-pulse motion-reduce:animate-none' : ''
          }`}
        >
          <div className="size-16 rounded-xl bg-[#f3f4f6]" />
          <div className="min-w-0 space-y-3">
            <div className="h-4 w-2/5 rounded bg-[#f3f4f6]" />
            <div className="h-3 w-3/5 rounded bg-[#f3f4f6]" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function StoreListFeedback({
  state,
  onClearSearch,
  onRetry,
}: StoreListFeedbackProps) {
  if (state.status === 'initial') {
    return <StoreListSkeleton isLoading={false} />
  }

  if (state.status === 'loading') {
    return <StoreListSkeleton isLoading />
  }

  if (state.status === 'error') {
    return (
      <div
        role="alert"
        className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-[#e5e7eb] bg-white px-6 py-10 text-center"
      >
        <TriangleAlert size={30} aria-hidden="true" className="text-[#dc2626]" />
        <h2 className="mt-4 text-lg font-semibold text-[#111111]">
          Não foi possível carregar as lojas
        </h2>
        <p className="mt-2 max-w-md text-sm text-[#6b7280]">{state.message}</p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 min-h-10 rounded-lg bg-[#e30507] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#b80406] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e30507] focus-visible:ring-offset-2 active:translate-y-px"
          >
            Tentar novamente
          </button>
        ) : null}
      </div>
    )
  }

  const isSearchEmpty = state.reason === 'search'

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-[#e5e7eb] bg-white px-6 py-10 text-center"
    >
      {isSearchEmpty ? (
        <SearchX size={30} aria-hidden="true" className="text-[#6b7280]" />
      ) : (
        <Store size={30} aria-hidden="true" className="text-[#6b7280]" />
      )}
      <h2 className="mt-4 text-lg font-semibold text-[#111111]">
        {isSearchEmpty ? 'Nenhuma loja encontrada' : 'Nenhuma loja disponível'}
      </h2>
      <p className="mt-2 max-w-md text-sm text-[#6b7280]">
        {isSearchEmpty
          ? 'Tente pesquisar por outro nome ou limpe o campo de busca.'
          : 'Ainda não há lojas disponíveis para explorar.'}
      </p>
      {isSearchEmpty ? (
        <button
          type="button"
          onClick={onClearSearch}
          className="mt-4 min-h-10 px-2 py-2 text-sm font-semibold text-[#e30507] underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e30507] focus-visible:ring-offset-2"
        >
          Limpar pesquisa
        </button>
      ) : null}
    </div>
  )
}
