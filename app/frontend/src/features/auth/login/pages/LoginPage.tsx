import { LoginCard } from '../components/LoginCard'
import { LoginHeader } from '../components/LoginHeader'
import styles from '../styles/LoginPage.module.css'
import type { AppRoute } from '../../../../app/routes/types'

type LoginPageProps = {
  onNavigate: (route: AppRoute, planId?: number) => void
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  return (
    <div className={`${styles.page} flex min-h-screen flex-col bg-[#f5f5f5]`}>
      <div className="fixed inset-x-0 top-0 z-50">
        <LoginHeader onNavigate={onNavigate} />
      </div>
      <div aria-hidden="true" className="h-[61px] shrink-0 sm:h-[73px] md:h-[81px]" />
      <main
        className={`${styles.main} flex flex-1 items-center justify-center px-4 py-8 sm:px-6 md:py-12 lg:px-10`}
        aria-label="Login de lojista"
      >
        <div className="relative z-10 flex w-full justify-center">
          <LoginCard
            onRegisterClick={() => onNavigate('/register')}
            onSuccess={(store) =>
              onNavigate(`/storefront/${encodeURIComponent(store.slug)}/manage`)
            }
          />
        </div>
      </main>
    </div>
  )
}
