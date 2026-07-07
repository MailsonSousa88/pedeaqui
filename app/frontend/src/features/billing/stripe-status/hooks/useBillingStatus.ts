import { useState } from "react";
import type { BillingStatus } from "../types/billing.types";

function getStatusFromUrl(): BillingStatus {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  if (status === "failed") {
    return "failed";
  }

  return "success";
}

export function useBillingStatus() {
  const [status, setStatus] = useState<BillingStatus>(getStatusFromUrl);

  return { status, setStatus };
}
