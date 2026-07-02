import { RegisterHeader } from '../components/RegisterHeader'
import { RegisterCard } from '../components/RegisterCard'
import styles from '../styles/RegisterPage.module.css'

export function RegisterPage() {
  return (
    <div className={`${styles.page} flex min-h-screen flex-col bg-[#f5f5f5]`}>
      <RegisterHeader />
      <main
        className={`${styles.main} flex flex-1 items-center justify-center px-4 py-8 sm:px-6 md:py-12 lg:px-10 lg:py-14`}
        aria-label="Cadastro de lojista"
      >
        <div className="relative z-10 flex w-full justify-center">
          <RegisterCard />
        </div>
      </main>
    </div>
  )
}
