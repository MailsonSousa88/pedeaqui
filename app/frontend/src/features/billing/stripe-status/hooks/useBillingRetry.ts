import { useState, useCallback } from "react";
import type { BillingStatus } from "../types/billing.types";

interface UseBillingRetryOptions {
  onSuccess?: () => void;
  onProcessing?: () => void;
  setStatus: (status: BillingStatus) => void;
}

const RETRY_DELAY_MS = 2000;

export function useBillingRetry({
  onSuccess,
  onProcessing,
  setStatus,
}: UseBillingRetryOptions) {
  const [isProcessingRetry, setIsProcessingRetry] = useState(false);

  const handleRetry = useCallback(() => {
    setIsProcessingRetry(true);
    onProcessing?.();

    setTimeout(() => {
      setIsProcessingRetry(false);
      setStatus("success");
      onSuccess?.();
    }, RETRY_DELAY_MS);
  }, [onSuccess, onProcessing, setStatus]);

  return { isProcessingRetry, handleRetry };
}
