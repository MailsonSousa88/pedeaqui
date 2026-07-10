import { ForgotPasswordCard } from '../components/ForgotPasswordCard'
import { ForgotPasswordHeader } from '../components/ForgotPasswordHeader'
import { ForgotPasswordStepper } from '../components/ForgotPasswordStepper'
import { useForgotPasswordFlow } from '../hooks/useForgotPasswordFlow'
import styles from '../styles/ForgotPasswordPage.module.css'

export function ForgotPasswordPage() {
  const { currentStep, goToEmailSent, simulateResetLinkOpening } =
    useForgotPasswordFlow()

  return (
    <div className={`${styles.page} flex min-h-screen flex-col bg-[#f5f5f5]`}>
      <div className="fixed inset-x-0 top-0 z-50">
        <ForgotPasswordHeader />
      </div>
      <div
        aria-hidden="true"
        className="h-[61px] shrink-0 sm:h-[73px] md:h-[81px]"
      />

      <main
        className={`${styles.main} flex flex-1 items-center justify-center px-4 py-8 sm:px-6 md:py-12 lg:px-10`}
        aria-label="Recuperacao de senha"
      >
        <div className="relative z-10 flex w-full max-w-md min-w-0 flex-col items-center">
          <ForgotPasswordStepper currentStep={currentStep} />
          <div className="mt-7 w-full sm:mt-8">
            <ForgotPasswordCard
              currentStep={currentStep}
              onRequestSuccess={goToEmailSent}
              onSimulateResetLinkOpening={simulateResetLinkOpening}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
