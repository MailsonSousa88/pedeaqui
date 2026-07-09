import { motion, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff, IdCard, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useRegisterForm } from '../hooks/useRegisterForm'
import { formatCpfInput } from '../utils/documentNormalize'
import { formatPhoneInput } from '../utils/phoneNormalize'
import { RegisterField } from './RegisterField'

type RegisterFormProps = {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { errors, isSubmitting, onSubmit, register, submissionError } = useRegisterForm({ onSuccess })
  const shouldReduceMotion = useReducedMotion()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const phoneRegistration = register('phone')
  const documentRegistration = register('document')

  return (
    <form
      className="flex flex-col gap-5"
      aria-label="Formulario de cadastro"
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
        id="phone"
        label="Numero de WhatsApp"
        type="text"
        placeholder="(11) 9912-3456"
        autoComplete="tel"
        inputMode="numeric"
        maxLength={14}
        icon={<Phone size={18} />}
        registration={{
          ...phoneRegistration,
          onChange: (event) => {
            event.target.value = formatPhoneInput(event.target.value)
            return phoneRegistration.onChange(event)
          },
        }}
        error={errors.phone?.message}
      />
      <RegisterField
        id="password"
        label="Senha"
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder="Minimo de 8 caracteres"
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
        label="CPF"
        type="text"
        placeholder="Digite seu CPF"
        autoComplete="off"
        inputMode="numeric"
        maxLength={14}
        icon={<IdCard size={18} />}
        registration={{
          ...documentRegistration,
          onChange: (event) => {
            event.target.value = formatCpfInput(event.target.value)
            return documentRegistration.onChange(event)
          },
        }}
        error={errors.document?.message}
      />

      {submissionError ? (
        <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-[#e30507]" role="alert">
          {submissionError}
        </p>
      ) : null}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-xl bg-[#e30507] px-6 py-4 text-sm font-semibold text-white shadow-sm focus:outline-2 focus:outline-solid focus:outline-offset-2 focus:outline-[#e30507] focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 md:text-base"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.12 }}
      >
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </motion.button>
    </form>
  )
}
