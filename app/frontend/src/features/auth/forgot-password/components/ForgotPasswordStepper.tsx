import type { ForgotPasswordStep } from '../types/forgotPassword'

type StepDefinition = {
  id: ForgotPasswordStep
  label: string
  number: string
}

type ForgotPasswordStepperProps = {
  currentStep: ForgotPasswordStep
}

const steps: StepDefinition[] = [
  {
    id: 'request',
    label: 'Solicitar link',
    number: '1',
  },
  {
    id: 'sent',
    label: 'E-mail enviado',
    number: '2',
  },
  {
    id: 'reset',
    label: 'Redefinir senha',
    number: '3',
  },
]

export function ForgotPasswordStepper({
  currentStep,
}: ForgotPasswordStepperProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <ol
      className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-1 sm:gap-2"
      aria-label="Etapas da recuperacao de senha"
    >
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isCompleted = index < currentIndex
        const stepColor = isActive || isCompleted ? '#e30507' : '#cfd4dc'
        const labelColor =
          isActive || isCompleted ? 'text-[#e30507]' : 'text-slate-500'

        return (
          <li
            key={step.id}
            className="contents"
            aria-current={isActive ? 'step' : undefined}
          >
            <div className="flex min-w-0 flex-col items-center gap-2 text-center">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm sm:h-9 sm:w-9"
                style={{ backgroundColor: stepColor }}
                aria-hidden="true"
              >
                {step.number}
              </span>
              <span
                className={`text-[11px] font-medium leading-tight sm:text-xs ${labelColor}`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 ? (
              <span
                className="mt-4 h-px w-8 bg-slate-300 min-[380px]:w-10 sm:w-16"
                style={{
                  backgroundColor: index < currentIndex ? '#e30507' : '#cfd4dc',
                }}
                aria-hidden="true"
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
