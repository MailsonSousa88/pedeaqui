import { useCallback, useMemo, useState } from "react";

import { createCheckoutSession } from "../services/checkoutReviewService";
import {
  BASIC_PLAN,
  CHECKOUT_REDIRECT_UNAVAILABLE_MESSAGE,
  type CheckoutFlowStatus,
} from "../types/checkoutReview";

export function useCheckoutReview() {
  const selectedPlan = useMemo(() => BASIC_PLAN, []);
  const [status, setStatus] = useState<CheckoutFlowStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const continueToPayment = useCallback(async () => {
    if (status === "loading") {
      return;
    }

    if (!selectedPlan) {
      setStatus("error");
      setErrorMessage(CHECKOUT_REDIRECT_UNAVAILABLE_MESSAGE);
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    const result = await createCheckoutSession({
      planId: selectedPlan.id,
    });

    if (result.status === "ready") {
      setStatus("ready");
      return;
    }

    setStatus("error");
    setErrorMessage(result.message);
  }, [selectedPlan, status]);

  return {
    selectedPlan,
    status,
    errorMessage,
    isLoading: status === "loading",
    continueToPayment,
  };
}
