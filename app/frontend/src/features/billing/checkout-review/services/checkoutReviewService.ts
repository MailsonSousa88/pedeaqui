import {
  CHECKOUT_REDIRECT_UNAVAILABLE_MESSAGE,
  type CheckoutSessionRequest,
  type CheckoutSessionResult,
} from "../types/checkoutReview";

export async function createCheckoutSession(
  request: CheckoutSessionRequest,
): Promise<CheckoutSessionResult> {
  void request;

  return {
    status: "unavailable",
    code: "CHECKOUT_SESSION_UNAVAILABLE",
    message: CHECKOUT_REDIRECT_UNAVAILABLE_MESSAGE,
  };
}
