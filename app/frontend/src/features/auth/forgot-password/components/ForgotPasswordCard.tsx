import { motion, useReducedMotion } from 'framer-motion'

import { ForgotPasswordEmailSent } from './ForgotPasswordEmailSent'
import { ForgotPasswordRequestForm } from './ForgotPasswordRequestForm'
import { ForgotPasswordResetForm } from './ForgotPasswordResetForm'
import type { ForgotPasswordStep } from '../types/forgotPassword'

type ForgotPasswordCardProps = {
  currentStep: ForgotPasswordStep
  onBackToLogin: () => void
  onRequestSubmit: (email: string) => Promise<void>
  isSubmitting: boolean
  requestError?: string
  onResend: () => Promise<void>
  isResending: boolean
  resendError?: string
  resendSuccessMessage?: string
}

export function ForgotPasswordCard({
  currentStep,
  onBackToLogin,
  onRequestSubmit,
  isSubmitting,
  requestError,
  onResend,
  isResending,
  resendError,
  resendSuccessMessage,
}: ForgotPasswordCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const content = {
    request: (
      <ForgotPasswordRequestForm
        onBackToLogin={onBackToLogin}
        onRequestSubmit={onRequestSubmit}
        isSubmitting={isSubmitting}
        submitError={requestError}
      />
    ),
    sent: (
      <ForgotPasswordEmailSent
        onBackToLogin={onBackToLogin}
        onResend={onResend}
        isResending={isResending}
        resendError={resendError}
        resendSuccessMessage={resendSuccessMessage}
      />
    ),
    reset: <ForgotPasswordResetForm onBackToLogin={onBackToLogin} />,
  }[currentStep]

  return (
    <motion.section
      className="w-full max-w-md rounded-2xl border border-gray-100 bg-white px-5 py-8 shadow-xl shadow-gray-200/60 sm:px-8 md:px-10 md:py-10"
      aria-labelledby="forgot-password-title"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.2,
        ease: 'easeOut',
      }}
    >
      {content}
    </motion.section>
  )
}
