import { Lock, Mail } from 'lucide-react'

import { ForgotPasswordField } from './ForgotPasswordField'
import { useForgotPasswordRequestForm } from '../hooks/useForgotPasswordRequestForm'

type ForgotPasswordRequestFormProps = {
  onRequestSuccess: () => void
}

export function ForgotPasswordRequestForm({
  onRequestSuccess,
}: ForgotPasswordRequestFormProps) {
  const {
    form: {
      register,
      formState: { errors },
    },
    handleRequestSubmit,
  } = useForgotPasswordRequestForm({ onRequestSuccess })

  return (
    <form
      className="flex w-full flex-col items-center"
      onSubmit={handleRequestSubmit}
      noValidate
    >
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f0] text-[#e30507]"
        aria-hidden="true"
      >
        <Mail size={30} strokeWidth={2.2} />
        <span className="absolute -right-1 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#e30507] text-white ring-4 ring-white">
          <Lock size={13} strokeWidth={2.4} />
        </span>
      </div>

      <h1
        id="forgot-password-title"
        className="mt-7 text-center text-2xl font-bold leading-tight text-[#111111] md:text-3xl"
      >
        Recuperar <span className="text-[#e30507]">senha</span>
      </h1>

      <p className="mt-3 max-w-sm text-center text-sm leading-relaxed text-gray-500 md:text-base">
        Digite seu e-mail para receber um link de redefinicão de senha.
      </p>

      <div className="mt-7 w-full">
        <ForgotPasswordField
          id="forgot-password-email"
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
          autoComplete="email"
          inputMode="email"
          required
          icon={<Mail size={19} strokeWidth={2.1} />}
          helperText="Enviaremos um link valido por 1 hora para este e-mail."
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#e30507] px-5 text-sm font-bold text-white shadow-lg shadow-red-200/60 outline-none transition-colors hover:bg-[#c80406] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507]"
      >
        Enviar link de recuperacao
      </button>

      <button
        type="button"
        className="mt-5 text-sm font-semibold text-[#e30507] outline-none transition-colors hover:text-[#c80406] focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e30507]"
      >
        Voltar para login
      </button>
    </form>
  )
}
