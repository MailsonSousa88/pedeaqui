import { Eye, EyeOff, KeyRound, LockKeyhole } from 'lucide-react'

import { ForgotPasswordField } from './ForgotPasswordField'
import { useForgotPasswordResetForm } from '../hooks/useForgotPasswordResetForm'

type ForgotPasswordResetFormProps = {
  onBackToLogin: () => void
}

export function ForgotPasswordResetForm({
  onBackToLogin,
}: ForgotPasswordResetFormProps) {
  const {
    form: {
      register,
      formState: { errors },
    },
    handleResetSubmit,
    isNewPasswordVisible,
    isConfirmPasswordVisible,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useForgotPasswordResetForm()

  return (
    <form
      className="flex w-full flex-col items-center"
      onSubmit={handleResetSubmit}
      noValidate
    >
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f0] text-[#e30507]"
        aria-hidden="true"
      >
        <LockKeyhole size={31} strokeWidth={2.2} />
        <span className="absolute -right-1 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#e30507] text-white ring-4 ring-white">
          <KeyRound size={13} strokeWidth={2.4} />
        </span>
      </div>

      <h1
        id="forgot-password-title"
        className="mt-7 text-center text-2xl font-bold leading-tight text-[#111111] md:text-3xl"
      >
        Criar nova <span className="text-[#e30507]">senha</span>
      </h1>

      <p className="mt-3 max-w-sm text-center text-sm leading-relaxed text-gray-500 md:text-base">
        Digite e confirme sua nova senha para acessar sua conta.
      </p>

      <div className="mt-7 flex w-full flex-col gap-5">
        <ForgotPasswordField
          id="forgot-password-new-password"
          label="Nova senha"
          type={isNewPasswordVisible ? 'text' : 'password'}
          placeholder="Digite sua nova senha"
          autoComplete="new-password"
          required
          icon={<LockKeyhole size={19} strokeWidth={2.1} />}
          helperText="A senha deve ter no minimo 8 caracteres."
          error={errors.newPassword?.message}
          {...register('newPassword')}
          trailingAction={
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 outline-none transition-colors hover:bg-[#fff0f0] hover:text-[#e30507] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507]"
              aria-label={
                isNewPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'
              }
              aria-pressed={isNewPasswordVisible}
              onPointerDown={(event) => {
                event.preventDefault()
              }}
              onMouseDown={(event) => {
                event.preventDefault()
              }}
              onClick={toggleNewPasswordVisibility}
            >
              {isNewPasswordVisible ? (
                <EyeOff size={18} strokeWidth={2.1} aria-hidden="true" />
              ) : (
                <Eye size={18} strokeWidth={2.1} aria-hidden="true" />
              )}
            </button>
          }
        />

        <ForgotPasswordField
          id="forgot-password-confirm-password"
          label="Confirmar senha"
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          placeholder="Confirme sua nova senha"
          autoComplete="new-password"
          required
          icon={<LockKeyhole size={19} strokeWidth={2.1} />}
          helperText="Repita a senha para confirmar."
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
          trailingAction={
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 outline-none transition-colors hover:bg-[#fff0f0] hover:text-[#e30507] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507]"
              aria-label={
                isConfirmPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'
              }
              aria-pressed={isConfirmPasswordVisible}
              onPointerDown={(event) => {
                event.preventDefault()
              }}
              onMouseDown={(event) => {
                event.preventDefault()
              }}
              onClick={toggleConfirmPasswordVisibility}
            >
              {isConfirmPasswordVisible ? (
                <EyeOff size={18} strokeWidth={2.1} aria-hidden="true" />
              ) : (
                <Eye size={18} strokeWidth={2.1} aria-hidden="true" />
              )}
            </button>
          }
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#e30507] px-5 text-sm font-bold text-white shadow-lg shadow-red-200/60 outline-none transition-colors hover:bg-[#c80406] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507]"
      >
        Redefinir senha
      </button>

      <button
        type="button"
        className="mt-5 text-sm font-semibold text-[#e30507] outline-none transition-colors hover:text-[#c80406] focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e30507]"
        onClick={onBackToLogin}
      >
        Voltar para login
      </button>
    </form>
  )
}
