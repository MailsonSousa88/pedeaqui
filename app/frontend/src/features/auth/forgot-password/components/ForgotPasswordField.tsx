import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

type ForgotPasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  helperText?: string
  error?: string
  icon?: ReactNode
  trailingAction?: ReactNode
}

export const ForgotPasswordField = forwardRef<
  HTMLInputElement,
  ForgotPasswordFieldProps
>(function ForgotPasswordField(
  {
    id,
    label,
    helperText,
    error,
    icon,
    trailingAction,
    className,
    ...inputProps
  },
  ref,
) {
  const helperId = helperText ? `${id}-helper` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="w-full text-left">
      <label htmlFor={id} className="text-sm font-semibold text-[#111111]">
        {label}
      </label>

      <div className="relative mt-2">
        {icon ? (
          <span
            className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          >
            {icon}
          </span>
        ) : null}

        <input
          ref={ref}
          id={id}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={`h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#111111] outline-none transition-colors placeholder:text-slate-400 focus:border-[#e30507] focus:ring-2 focus:ring-[#e30507]/15 ${
            icon ? 'pl-11' : ''
          } ${trailingAction ? 'pr-12' : ''} ${className ?? ''}`}
          {...inputProps}
        />

        {trailingAction ? (
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2">
            {trailingAction}
          </div>
        ) : null}
      </div>

      {helperText ? (
        <p id={helperId} className="mt-2 text-xs leading-relaxed text-slate-500">
          {helperText}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          className="mt-2 text-xs font-medium text-[#e30507]"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
})
