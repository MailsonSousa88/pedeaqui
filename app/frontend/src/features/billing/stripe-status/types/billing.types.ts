export type BillingStatus = "success" | "failed";

export interface Toast {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

export interface FailedPageProps {
  errorMessage?: string;
  onTryAgain?: () => void;
  onBackToPlans?: () => void;
}

export interface SuccessPageProps {
  onConfigureStore?: () => void;
  onGoToDashboard?: () => void;
  planName?: string;
  planPrice?: string;
  billingCycle?: string;
}
