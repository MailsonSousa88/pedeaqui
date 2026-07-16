import { CheckCircle2, Loader2 } from 'lucide-react'
import type { FormEvent } from 'react'

import { PrimaryButton } from '../../../../shared/components/PrimaryButton'
import { SecondaryButton } from '../../../../shared/components/SecondaryButton'
import { AddressStep } from '../components/AddressStep'
import { IdentityStep } from '../components/IdentityStep'
import { ReviewStep } from '../components/ReviewStep'
import { StepProgress } from '../components/StepProgress'
import { StorePreconfigurationHeader } from '../components/StorePreconfigurationHeader'
import { useStorePreconfigurationForm } from '../hooks/useStorePreconfigurationForm'
import type { StorePreconfigurationResult } from '../types/storePreconfiguration'

type StorePreconfigurationPageProps = {
  onBackToRegister?: () => void
  onSuccess?: (result: Extract<StorePreconfigurationResult, { ok: true }>) => void
}

export function StorePreconfigurationPage({
  onBackToRegister,
  onSuccess,
}: StorePreconfigurationPageProps) {
  const {
    currentStep,
    form,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isSubmitting,
    progress,
    submissionError,
    submit,
  } = useStorePreconfigurationForm({
    onBackToRegister,
    onSuccess,
  })

  const values = form.watch()
  const isReviewStep = currentStep === 3

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!isReviewStep) {
      event.preventDefault()
      void goToNextStep()
      return
    }

    void submit(event)
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-4 py-6 text-[#111111] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <StorePreconfigurationHeader currentStep={currentStep} totalSteps={progress.totalSteps} />

        <StepProgress currentStep={currentStep} totalSteps={3} />

        <form
          className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm sm:p-8"
          noValidate
          onSubmit={handleFormSubmit}
        >
          {currentStep === 1 ? (
            <IdentityStep
              disabled={isSubmitting}
              errors={form.formState.errors}
              register={form.register}
            />
          ) : null}

          {currentStep === 2 ? (
            <AddressStep
              disabled={isSubmitting}
              errors={form.formState.errors}
              register={form.register}
            />
          ) : null}

          {isReviewStep ? <ReviewStep onEdit={goToStep} values={values} /> : null}

          {submissionError ? (
            <p
              className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-[#dc2626]"
              role="alert"
            >
              {submissionError}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">
            <SecondaryButton
              disabled={isSubmitting}
              onClick={goToPreviousStep}
              type="button"
            >
              {currentStep === 1 ? 'Voltar ao cadastro' : 'Voltar'}
            </SecondaryButton>

            {isReviewStep ? (
              <PrimaryButton
                key="finalize-preconfiguration"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <Loader2 aria-hidden="true" className="animate-spin" size={16} />
                ) : (
                  <CheckCircle2 aria-hidden="true" size={16} />
                )}
                {isSubmitting ? 'Finalizando...' : 'Finalizar'}
              </PrimaryButton>
            ) : (
              <PrimaryButton
                key="continue-preconfiguration"
                disabled={isSubmitting}
                onClick={(event) => {
                  event.preventDefault()
                  void goToNextStep()
                }}
                type="button"
              >
                Continuar
              </PrimaryButton>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
