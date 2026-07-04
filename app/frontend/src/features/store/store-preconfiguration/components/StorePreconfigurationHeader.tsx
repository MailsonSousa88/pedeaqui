import type { StorePreconfigurationStep } from '../types/storePreconfiguration'

type StorePreconfigurationHeaderProps = {
  currentStep: StorePreconfigurationStep
  totalSteps?: number
}

export function StorePreconfigurationHeader({
  currentStep,
  totalSteps = 3,
}: StorePreconfigurationHeaderProps) {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <img src="/logoPedeAqui.jpeg" alt="PedeAqui" className="h-10 w-auto object-contain" />
        <span className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
          Etapa {currentStep} de {totalSteps}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-red-600">Pré-registro da loja</p>
        <h1 className="text-3xl font-bold tracking-normal text-gray-950 sm:text-4xl">
          Configure sua loja
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Informe os dados iniciais da sua loja para seguir para a validação do pré-registro.
        </p>
      </div>
    </header>
  )
}
