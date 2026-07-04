import { motion, useReducedMotion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import { LoginForm } from './LoginForm'

export function LoginCard() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      className="w-full max-w-md rounded-2xl border border-gray-100 bg-white px-5 py-8 shadow-xl shadow-gray-200/60 sm:px-8 md:px-10 md:py-10"
      aria-labelledby="login-title"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.2,
        ease: 'easeOut',
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f0] text-[#e30507]"
          aria-hidden="true"
        >
          <LogIn size={30} strokeWidth={2.2} />
        </div>

        <h1
          id="login-title"
          className="mt-5 text-2xl font-bold leading-tight text-[#111111] md:text-3xl"
        >
          <span className="text-[#e30507]">Entrar</span> na sua conta
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 md:text-base">
          Digite seu e-mail e senha para acessar
          <br /> sua conta no{' '}
          <span className="font-semibold text-[#e30507]">PedeAqui</span>.
        </p>
      </div>

      <div className="mt-8">
        <LoginForm />
      </div>

      <div className="my-5 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-[#e5e7eb]" />
        <span className="text-xs text-gray-400">ou</span>
        <span className="h-px flex-1 bg-[#e5e7eb]" />
      </div>

      <p className="text-center text-xs text-gray-500 sm:text-sm">
        Não tem uma conta?{' '}
        <button
          type="button"
          className="rounded-md border-0 bg-transparent p-1 font-semibold text-[#e30507] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507]"
        >
          Cadastre-se
        </button>
      </p>
    </motion.section>
  )
}
