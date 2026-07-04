import { motion, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useLoginForm } from '../hooks/useLoginForm'
import { LoginField } from './LoginField'

export function LoginForm() {
  const {
    errors,
    isPasswordVisible,
    onSubmit,
    register,
    togglePasswordVisibility,
  } = useLoginForm()
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

      <motion.button
        type="submit"
        className="mt-1 w-full rounded-xl bg-[#e30507] px-6 py-3.5 text-sm font-semibold text-white shadow-sm outline-none transition-colors hover:bg-[#b80406] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507] md:py-4 md:text-base"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      >
        Entrar
      </motion.button>
    </form>
  )
}
