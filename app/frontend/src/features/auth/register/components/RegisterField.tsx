import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

type TrailingAction = {
  ariaLabel: string
  icon: ReactNode
  onClick: () => void
  pressed?: boolean
}

type RegisterFieldProps = {
  id: string
  label: string
  type: 'email' | 'password' | 'text'
  placeholder: string
  autoComplete: string
  inputMode?: 'email' | 'numeric' | 'text'
  maxLength?: number
  icon: ReactNode
  trailingAction?: TrailingAction
  registration: UseFormRegisterReturn
  error?: string
}

export function RegisterField({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  icon,
  trailingAction,
  registration,
  error,
}: RegisterFieldProps) {
  const shouldReduceMotion = useReducedMotion()
  const errorId = `${id}-error`
  const inputClassName = [
    'w-full rounded-xl border bg-white py-3.5 pl-11 text-sm text-[#111111] placeholder:text-gray-400 shadow-sm outline-none focus:border-transparent focus:outline-2 focus:outline-solid focus:outline-offset-2 focus:outline-[#e30507] focus:ring-2 focus:ring-[#e30507] md:py-4 md:text-base',
    trailingAction ? 'register-password-input pr-16' : 'pr-4',
    error ? 'border-red-400 ring-2 ring-red-100' : 'border-[#e5e7eb]',
  ].join(' ')

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-[#111111]">
        {label}
      </label>
      <div className="relative">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e30507]"
          aria-hidden="true"
        >
          {icon}
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? 'true' : 'false'}
          className={inputClassName}
          {...registration}
        />
        {trailingAction ? (
          <button
            type="button"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 appearance-none items-center justify-center border-0 bg-transparent p-0 text-gray-400 outline-none transition-colors hover:text-[#e30507] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-[#e30507]"
            aria-label={trailingAction.ariaLabel}
            aria-pressed={trailingAction.pressed}
            onPointerDown={(event) => {
              event.preventDefault()
            }}
            onClick={trailingAction.onClick}
          >
            {trailingAction.icon}
          </button>
        ) : null}
      </div>
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key={errorId}
            id={errorId}
            role="alert"
            className="text-xs font-medium text-[#e30507]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -4 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.16,
              ease: 'easeOut',
            }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
