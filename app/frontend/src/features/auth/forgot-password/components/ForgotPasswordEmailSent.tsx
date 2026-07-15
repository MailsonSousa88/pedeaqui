import { Clock, MailCheck } from 'lucide-react'

import { SecondaryButton } from '../../../../shared/components/SecondaryButton'

type ForgotPasswordEmailSentProps = {
  onBackToLogin: () => void
  onResend: () => Promise<void>
  isResending: boolean
  resendError?: string
  resendSuccessMessage?: string
}

export function ForgotPasswordEmailSent({
  onBackToLogin,
  onResend,
  isResending,
  resendError,
  resendSuccessMessage,
}: ForgotPasswordEmailSentProps) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f0] text-[#e30507]"
        aria-hidden="true"
      >
        <MailCheck size={32} strokeWidth={2.2} />
      </div>

      <h1
        id="forgot-password-title"
        className="mt-7 text-2xl font-bold leading-tight text-[#111111] md:text-3xl"
      >
        Verifique seu <span className="text-[#e30507]">e-mail</span>
      </h1>

      <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 md:text-base">
        Enviamos um link de redefinicao para o e-mail informado.
      </p>

      <div className="mt-7 w-full rounded-2xl border border-[#ffd6d6] bg-[#fff7f7] px-4 py-4 text-left">
        <p className="text-sm font-semibold leading-relaxed text-[#111111]">
          Clique no link recebido para continuar a redefinicao da sua senha.
        </p>
      </div>

      <div className="mt-5 flex w-full flex-col gap-3 text-left">
        <div className="flex gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600">
          <Clock
            className="mt-0.5 shrink-0 text-[#e30507]"
            size={18}
            strokeWidth={2.2}
            aria-hidden="true"
          />
          <span>O link e valido por 1 hora.</span>
        </div>

        <div className="flex gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600">
          <MailCheck
            className="mt-0.5 shrink-0 text-[#e30507]"
            size={18}
            strokeWidth={2.2}
            aria-hidden="true"
          />
          <span>Verifique tambem sua caixa de spam ou lixo eletronico.</span>
        </div>
      </div>

      <button
        type="button"
        disabled={isResending}
        aria-busy={isResending}
        onClick={() => {
          void onResend()
        }}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#e30507] px-5 text-sm font-bold text-white shadow-lg shadow-red-200/60 outline-none transition-colors hover:bg-[#c80406] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507] disabled:cursor-not-allowed disabled:bg-[#d34747]"
      >
        {isResending ? 'Enviando...' : 'Enviar novamente'}
      </button>

      {resendSuccessMessage ? (
        <p className="mt-3 text-sm font-medium text-[#0f9d58]" role="status">
          {resendSuccessMessage}
        </p>
      ) : null}

      {resendError ? (
        <p className="mt-3 text-sm font-medium text-[#e30507]" role="alert">
          {resendError}
        </p>
      ) : null}

      <SecondaryButton
        type="button"
        className="mt-5 w-full"
        onClick={onBackToLogin}
      >
        Voltar para login
      </SecondaryButton>
    </div>
  )
}
