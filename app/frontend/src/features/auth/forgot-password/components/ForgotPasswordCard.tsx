import { motion, useReducedMotion } from 'framer-motion'

import { ForgotPasswordEmailSent } from './ForgotPasswordEmailSent'
import { ForgotPasswordRequestForm } from './ForgotPasswordRequestForm'
import { ForgotPasswordResetForm } from './ForgotPasswordResetForm'
import type { ForgotPasswordStep } from '../types/forgotPassword'

type ForgotPasswordCardProps = {
  currentStep: ForgotPasswordStep
  onRequestSuccess: () => void
  onSimulateResetLinkOpening: () => void
}

export function ForgotPasswordCard({
  currentStep,
  onRequestSuccess,
  onSimulateResetLinkOpening,
}: ForgotPasswordCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const content = {
    request: <ForgotPasswordRequestForm onRequestSuccess={onRequestSuccess} />,
    sent: (
      <ForgotPasswordEmailSent
        onSimulateResetLinkOpening={onSimulateResetLinkOpening}
      />
    ),
    reset: <ForgotPasswordResetForm />,
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
