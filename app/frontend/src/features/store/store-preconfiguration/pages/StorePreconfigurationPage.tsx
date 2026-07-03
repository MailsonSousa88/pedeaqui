import { CheckCircle2, Loader2 } from 'lucide-react'

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

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff_0%,#f8fafc_100%)] px-4 py-6 text-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <StorePreconfigurationHeader currentStep={currentStep} totalSteps={progress.totalSteps} />

        <StepProgress currentStep={currentStep} totalSteps={3} />

        <form
          className="rounded-3xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200/60 sm:p-8"
          noValidate
          onSubmit={submit}
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
              className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700"
              role="alert"
            >
              {submissionError}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              onClick={goToPreviousStep}
              type="button"
            >
              {currentStep === 1 ? 'Voltar ao cadastro' : 'Voltar'}
            </button>

            {isReviewStep ? (
              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <Loader2 aria-hidden="true" className="animate-spin" size={16} />
                ) : (
                  <CheckCircle2 aria-hidden="true" size={16} />
                )}
                {isSubmitting ? 'Finalizando...' : 'Finalizar'}
              </button>
            ) : (
              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
                onClick={goToNextStep}
                type="button"
              >
                Continuar
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
