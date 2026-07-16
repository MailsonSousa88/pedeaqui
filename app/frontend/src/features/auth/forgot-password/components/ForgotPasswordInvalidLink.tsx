import { AlertTriangle } from 'lucide-react'

import { SecondaryButton } from '../../../../shared/components/SecondaryButton'

type ForgotPasswordInvalidLinkProps = {
  onBackToLogin: () => void
  onRequestNewLink: () => void
}

export function ForgotPasswordInvalidLink({
  onBackToLogin,
  onRequestNewLink,
}: ForgotPasswordInvalidLinkProps) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f0] text-[#e30507]"
        aria-hidden="true"
      >
        <AlertTriangle size={32} strokeWidth={2.2} />
      </div>

      <h1
        id="forgot-password-title"
        className="mt-7 text-2xl font-bold leading-tight text-[#111111] md:text-3xl"
      >
        Link <span className="text-[#e30507]">expirado</span>
      </h1>

      <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 md:text-base">
        Este link expirou ou ja foi utilizado. Solicite um novo link para continuar.
      </p>

      <button
        type="button"
        className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#e30507] px-5 text-sm font-bold text-white shadow-lg shadow-red-200/60 outline-none transition-colors hover:bg-[#c80406] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507]"
        onClick={onRequestNewLink}
      >
        Solicitar novo link
      </button>

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
