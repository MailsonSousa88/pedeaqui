import { UserRoundPlus } from 'lucide-react'

export function LoginHeader() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 flex w-full min-w-0 items-center justify-between gap-2 border-b border-[#e5e7eb] bg-white px-3 py-3 shadow-sm sm:gap-4 sm:px-6 sm:py-4 md:px-10 lg:px-12">
      <img
        src="/logoPedeAqui.jpeg"
        alt="PedeAqui"
        className="h-9 w-auto max-w-[112px] object-contain sm:h-10 sm:max-w-[180px] md:h-12"
      />

      <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-4 md:gap-6">
        <span className="whitespace-nowrap text-[12px] font-medium text-[#111111] sm:text-sm md:text-base">
          Não tem uma conta?
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg border border-[#e30507] bg-white px-2 py-1.5 text-xs font-semibold text-[#e30507] outline-none transition-colors hover:bg-[#e30507] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30507] sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm md:px-6 md:py-3 md:text-base"
        >
          Cadastrar
          <UserRoundPlus
            className="hidden h-4 w-4 sm:inline md:h-[18px] md:w-[18px]"
            strokeWidth={2.4}
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  )
}
