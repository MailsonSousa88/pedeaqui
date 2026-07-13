import { useCallback, useMemo, useState } from 'react'

import { activateTrialStore } from '../services/checkoutReviewService'
import {
  BASIC_PLAN,
  CHECKOUT_REDIRECT_UNAVAILABLE_MESSAGE,
  type CheckoutFlowStatus,
  type CreatedStore,
} from '../types/checkoutReview'

type UseCheckoutReviewOptions = {
  onError?: (message: string) => void
  onSuccess?: (store: CreatedStore) => void
}

export function useCheckoutReview({ onError, onSuccess }: UseCheckoutReviewOptions = {}) {
  const selectedPlan = useMemo(() => BASIC_PLAN, [])
  const [status, setStatus] = useState<CheckoutFlowStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const continueToPayment = useCallback(async () => {
    if (status === 'loading') {
      return
    }

    setStatus('loading')
    setErrorMessage(null)

    try {
      const store = await activateTrialStore()
      setStatus('ready')
      onSuccess?.(store)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : CHECKOUT_REDIRECT_UNAVAILABLE_MESSAGE

      setStatus('error')
      setErrorMessage(message)
      onError?.(message)
    }
  }, [onError, onSuccess, status])

  return {
    selectedPlan,
    status,
    errorMessage,
    isLoading: status === 'loading',
    continueToPayment,
  }
}
