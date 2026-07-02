import type { ReactNode } from 'react'

type FormFieldProps = {
  children: ReactNode
  error?: string
  hint?: string
  htmlFor: string
  icon?: ReactNode
  label: string
  required?: boolean
}

export function FormField({
  children,
  error,
  hint,
  htmlFor,
  icon,
  label,
  required = false,
}: FormFieldProps) {
  const descriptionId = hint ? `${htmlFor}-hint` : undefined
  const errorId = error ? `${htmlFor}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-950" htmlFor={htmlFor}>
        {label}
        {required ? <span className="ml-1 text-red-600">*</span> : null}
      </label>

      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 text-red-600">
            {icon}
          </span>
        ) : null}
        {children}
      </div>

      {hint ? (
        <p className="text-xs leading-5 text-gray-500" id={descriptionId}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p className="text-xs font-medium leading-5 text-red-600" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const formFieldInputClassName =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-950 placeholder:text-gray-400 shadow-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-100'

export const formFieldInputWithIconClassName =
  'w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-950 placeholder:text-gray-400 shadow-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-100'
