import { motion, useReducedMotion } from 'framer-motion'
import { UserRoundPlus } from 'lucide-react'
import { RegisterForm } from './RegisterForm'
import { RegisterLegalNotice } from './RegisterLegalNotice'

export function RegisterCard() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      className="w-full max-w-[41rem] rounded-2xl border border-gray-100 bg-white px-5 py-8 shadow-xl shadow-gray-200/60 sm:px-8 md:px-11 md:py-10 lg:px-12 lg:py-11"
      aria-labelledby="register-title"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.28,
        ease: 'easeOut',
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f0] text-[#e30507] md:h-20 md:w-20"
          aria-hidden="true"
        >
          <UserRoundPlus size={34} strokeWidth={2.2} />
        </div>

        <h1
          id="register-title"
          className="mt-5 text-2xl font-bold leading-tight text-[#111111] md:mt-6 md:text-3xl"
        >
          Crie sua <span className="text-[#e30507]">conta</span>
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 md:text-base">
          Preencha os dados abaixo para criar sua
          <br />
          conta no{' '}
          <span className="font-semibold text-[#e30507]">PedeAqui</span>.
        </p>
      </div>

      <div className="mt-8 md:mt-9">
        <RegisterForm />
      </div>

      <div className="mt-6 md:mt-7">
        <RegisterLegalNotice />
      </div>
    </motion.section>
  )
}
