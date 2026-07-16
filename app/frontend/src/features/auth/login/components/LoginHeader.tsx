import Header from '../../../../shared/components/Header'
import type { AppRoute } from '../../../../app/routes/types'

type LoginHeaderProps = {
  onNavigate: (route: AppRoute, planId?: number) => void
}

export function LoginHeader({ onNavigate }: LoginHeaderProps) {
  return (
    <Header
      currentPath="/login"
      onNavigate={onNavigate}
      minimal={true}
      rightAction={
        <button
          onClick={() => {
            sessionStorage.setItem('scrollToPlanos', 'true')
            onNavigate('/')
          }}
          className="rounded-lg bg-primary px-3.5 py-1.5 font-sans text-xs font-semibold text-white shadow-md shadow-primary/10 transition-colors hover:bg-primary-dark hover:shadow-lg sm:px-5 sm:py-2 sm:text-sm"
        >
          Começar Agora
        </button>
      }
    />
  )
}
