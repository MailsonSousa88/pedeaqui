import type { StorePreconfigurationStep } from '../types/storePreconfiguration'

type StepProgressProps = {
  currentStep: StorePreconfigurationStep
  totalSteps?: 3
}

const stepLabels = ['Identidade', 'Endereço', 'Revisão'] as const

export function StepProgress({ currentStep, totalSteps = 3 }: StepProgressProps) {
  const progressValue = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="space-y-3">
      <div
        aria-label="Progresso da pre-configuracao da loja"
        aria-valuemax={totalSteps}
        aria-valuemin={1}
        aria-valuenow={currentStep}
        aria-valuetext={`Etapa ${currentStep} de ${totalSteps}`}
        className="grid grid-cols-3 gap-2"
        role="progressbar"
      >
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber <= currentStep

          return (
            <span
              aria-hidden="true"
              className={`h-2 rounded-full transition-colors ${
                isCompleted ? 'bg-red-600' : 'bg-gray-200'
              }`}
              key={stepNumber}
            />
          )
        })}
      </div>

      <div className="flex items-center justify-between gap-2 text-xs font-medium text-gray-500">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1
          const isCurrent = stepNumber === currentStep

          return (
            <span
              className={isCurrent ? 'text-red-600' : 'text-gray-500'}
              key={label}
            >
              {label}
            </span>
          )
        })}
      </div>

      <p className="sr-only">{progressValue}% do fluxo concluido.</p>
    </div>
  )
}
