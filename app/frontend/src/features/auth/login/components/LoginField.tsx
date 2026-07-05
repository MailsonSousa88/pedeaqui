import type { ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

type TrailingAction = {
  ariaLabel: string
  icon: ReactNode
  onClick: () => void
  pressed: boolean
}

type LoginFieldProps = {
  id: string
  label: string
  type: 'email' | 'password' | 'text'
  placeholder: string
  autoComplete: 'email' | 'current-password'
  icon: ReactNode
  registration: UseFormRegisterReturn
  error?: string
  trailingAction?: TrailingAction
}

export function LoginField({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  icon,
  registration,
  error,
  trailingAction,
}: LoginFieldProps) {
  const errorId = `${id}-error`
  const inputClassName = [
    'w-full rounded-xl border bg-white py-3.5 pl-11 text-sm text-[#111111] shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#e30507] md:py-4 md:text-base',
    trailingAction ? 'pr-14' : 'pr-4',
    error ? 'border-red-400 ring-2 ring-red-200' : 'border-[#e5e7eb]',
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
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className={inputClassName}
          {...registration}
        />

        {trailingAction ? (
          <button
            type="button"
            className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border-0 bg-transparent p-0 text-gray-400 outline-none transition-colors hover:text-[#e30507] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507]"
            aria-label={trailingAction.ariaLabel}
            aria-pressed={trailingAction.pressed}
            onPointerDown={(event) => event.preventDefault()}
            onClick={trailingAction.onClick}
          >
            {trailingAction.icon}
          </button>
        ) : null}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-[#dc2626]">
          {error}
        </p>
      ) : null}
    </div>
  )
}
