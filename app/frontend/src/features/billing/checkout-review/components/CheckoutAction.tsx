import { AlertCircle, LockKeyhole, Loader2 } from 'lucide-react'

type CheckoutActionProps = {
  isLoading: boolean
  errorMessage: string | null
  onContinue: () => void
}

export function CheckoutAction({
  isLoading,
  errorMessage,
  onContinue,
}: CheckoutActionProps) {
  return (
    <div className="space-y-3">
      {errorMessage ? (
        <div
          className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"
          role="alert"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <button
        type="button"
        disabled={isLoading}
        onClick={onContinue}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e30507] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b80406] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
        ) : (
          <LockKeyhole size={18} aria-hidden="true" />
        )}
        {isLoading ? 'Criando sua loja...' : 'Ativar loja gratuitamente'}
      </button>

      <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-gray-500">
        <LockKeyhole size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
        Nenhuma cobranca sera realizada durante o periodo de teste.
      </p>
    </div>
  )
}
