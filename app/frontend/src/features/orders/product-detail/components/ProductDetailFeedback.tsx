import { AlertCircle, Loader2, PackageX } from 'lucide-react'

type ProductDetailFeedbackProps =
  | { status: 'loading' }
  | {
      status: 'error'
      message: string
      onRetry: () => void
      onBack: () => void
    }
  | {
      status: 'unavailable'
      title: string
      description: string
      onBack: () => void
    }

export function ProductDetailFeedback(props: ProductDetailFeedbackProps) {
  if (props.status === 'loading') {
    return (
      <section
        aria-busy="true"
        aria-label="Carregando detalhes do produto"
        className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-12"
      >
        <div className="flex aspect-square min-h-72 items-center justify-center rounded-2xl border border-gray-200 bg-gray-100 text-[#e30507] sm:aspect-[4/3]">
          <Loader2 aria-hidden="true" className="animate-spin" size={30} />
        </div>
        <div className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="h-6 w-28 rounded-full bg-gray-100" />
          <div className="h-10 w-4/5 rounded-xl bg-gray-100" />
          <div className="h-20 rounded-xl bg-gray-100" />
          <div className="h-16 w-40 rounded-xl bg-gray-100" />
          <span className="sr-only">Carregando produto...</span>
        </div>
      </section>
    )
  }

  const isError = props.status === 'error'

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-4xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex w-full flex-col items-center gap-5 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0f0] text-[#e30507]">
          {isError ? (
            <AlertCircle aria-hidden="true" size={26} />
          ) : (
            <PackageX aria-hidden="true" size={26} />
          )}
        </span>
        <div>
          <h1 className="text-xl font-semibold leading-tight text-[#111111] md:text-2xl">
            {isError ? 'Não foi possível carregar o produto' : props.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#6b7280] md:text-base">
            {isError ? props.message : props.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {isError ? (
            <button
              className="inline-flex items-center justify-center rounded-xl bg-[#e30507] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b80406] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
              onClick={props.onRetry}
              type="button"
            >
              Tentar novamente
            </button>
          ) : null}
          <button
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition-colors hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
            onClick={props.onBack}
            type="button"
          >
            Voltar para a loja
          </button>
        </div>
      </div>
    </section>
  )
}
