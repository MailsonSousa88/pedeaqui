import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from 'lucide-react'
import { useLoginForm } from '../hooks/useLoginForm'
import { LoginField } from './LoginField'
import type { LoginResolvedStore } from '../types/login'

type LoginFormProps = {
  onSuccess?: (store: LoginResolvedStore) => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const {
    errors,
    isPasswordVisible,
    isSubmitting,
    onSubmit,
    register,
    submissionError,
    submissionStage,
    togglePasswordVisibility,
  } = useLoginForm({ onSuccess })
  const shouldReduceMotion = useReducedMotion()

  return (
    <form
      className="flex flex-col gap-5"
      aria-label="Formulário de login"
      onSubmit={onSubmit}
      noValidate
    >
      <LoginField
        id="login-email"
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        autoComplete="email"
        icon={<Mail size={18} aria-hidden="true" />}
        registration={register('email')}
        error={errors.email?.message}
      />

      <LoginField
        id="login-password"
        label="Senha"
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder="Digite sua senha"
        autoComplete="current-password"
        icon={<LockKeyhole size={18} aria-hidden="true" />}
        registration={register('password')}
        error={errors.password?.message}
        trailingAction={{
          ariaLabel: isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha',
          icon: isPasswordVisible ? (
            <EyeOff size={20} aria-hidden="true" />
          ) : (
            <Eye size={20} aria-hidden="true" />
          ),
          onClick: togglePasswordVisibility,
          pressed: isPasswordVisible,
        }}
      />

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-md border-0 bg-transparent p-1 text-xs font-semibold text-[#e30507] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507] sm:text-sm"
        >
          Esqueci minha senha
        </button>
      </div>

      {submissionError ? (
        <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-[#e30507]" role="alert">
          {submissionError}
        </p>
      ) : null}

      <AnimatePresence>
        {submissionStage === 'resolving-store' ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            aria-live="polite"
            className="flex items-center gap-3 rounded-xl border border-[#e30507]/15 bg-[#fff0f0] px-4 py-3 text-sm font-medium text-[#111111]"
            exit={{ opacity: 0, y: -4 }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
            role="status"
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
          >
            <Loader2 aria-hidden="true" className="shrink-0 animate-spin text-[#e30507]" size={18} />
            Estamos carregando os dados e preparando sua loja...
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e30507] px-6 py-4 text-sm font-semibold text-white shadow-sm focus:outline-2 focus:outline-solid focus:outline-offset-2 focus:outline-[#e30507] focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80 md:text-base"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.12 }}
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" size={18} />
            <span>
              {submissionStage === 'resolving-store' ? 'Montando sua loja...' : 'Validando acesso...'}
            </span>
          </>
        ) : (
          'Entrar'
        )}
      </motion.button>
    </form>
  )
}
