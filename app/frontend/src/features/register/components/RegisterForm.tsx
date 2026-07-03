import { motion, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff, IdCard, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useRegisterForm } from '../hooks/useRegisterForm'
import { RegisterField } from './RegisterField'

export function RegisterForm() {
  const { errors, onSubmit, register } = useRegisterForm()
  const shouldReduceMotion = useReducedMotion()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <form
      className="flex flex-col gap-5"
      aria-label="Formulário de cadastro"
      onSubmit={onSubmit}
      noValidate
    >
      <RegisterField
        id="full-name"
        label="Nome completo"
        type="text"
        placeholder="Digite seu nome completo"
        autoComplete="name"
        icon={<UserRound size={18} />}
        registration={register('fullName')}
        error={errors.fullName?.message}
      />
      <RegisterField
        id="email"
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        autoComplete="email"
        icon={<Mail size={18} />}
        registration={register('email')}
        error={errors.email?.message}
      />
      <RegisterField
        id="password"
        label="Senha"
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder="Mínimo de 8 caracteres"
        autoComplete="new-password"
        icon={<LockKeyhole size={18} />}
        trailingAction={{
          ariaLabel: isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha',
          icon: isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />,
          onClick: () => setIsPasswordVisible((isVisible) => !isVisible),
          pressed: isPasswordVisible,
        }}
        registration={register('password')}
        error={errors.password?.message}
      />
      <RegisterField
        id="document"
        label="CPF ou CNPJ"
        type="text"
        placeholder="Digite seu CPF ou CNPJ"
        autoComplete="off"
        icon={<IdCard size={18} />}
        registration={register('document')}
        error={errors.document?.message}
      />

      <motion.button
        type="submit"
        className="mt-2 w-full rounded-xl bg-[#e30507] px-6 py-4 text-sm font-semibold text-white shadow-sm focus:outline-2 focus:outline-solid focus:outline-offset-2 focus:outline-[#e30507] focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 md:text-base"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.12 }}
      >
        Cadastrar
      </motion.button>
    </form>
  )
}
