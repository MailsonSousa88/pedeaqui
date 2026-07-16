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
        <span className="rounded-full border border-[#e30507]/15 bg-[#fff0f0] px-3 py-1 text-xs font-semibold text-[#e30507]">
          Etapa {currentStep} de {totalSteps}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-[#e30507]">Pré-registro da loja</p>
        <h1 className="text-2xl font-bold leading-tight text-[#111111] md:text-3xl">
          Configure sua loja
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
          Informe os dados iniciais da sua loja para seguir para a validação do pré-registro.
        </p>
      </div>
    </header>
  )
}
