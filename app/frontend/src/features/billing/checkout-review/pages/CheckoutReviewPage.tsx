import { CreditCard, ShieldCheck } from "lucide-react";

import { CheckoutAction } from "../components/CheckoutAction";
import { CheckoutReviewHeader } from "../components/CheckoutReviewHeader";
import { PaymentMethodList } from "../components/PaymentMethodList";
import { SecurityNotice } from "../components/SecurityNotice";
import { SelectedPlanCard } from "../components/SelectedPlanCard";
import { useCheckoutReview } from "../hooks/useCheckoutReview";
import { ACCEPTED_PAYMENT_METHODS } from "../types/checkoutReview";

export function CheckoutReviewPage() {
  const { selectedPlan, errorMessage, isLoading, continueToPayment } =
    useCheckoutReview();

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <CheckoutReviewHeader />

      <section className="mx-auto flex w-full max-w-2xl flex-col px-5 pb-10 pt-6 sm:px-8 sm:pt-10">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#fff0f0] text-[#e30507] sm:h-24 sm:w-24">
              <CreditCard size={38} strokeWidth={2.5} aria-hidden="true" />
              <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#e30507] shadow-sm sm:bottom-4 sm:right-4">
                <ShieldCheck size={18} strokeWidth={2.5} aria-hidden="true" />
              </span>
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-[#e30507]">
              Ativação da loja
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-[#111111] sm:text-3xl">
              Finalize sua <span className="text-[#e30507]">ativação</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
              Revise seu plano e prepare o pagamento seguro pelo ambiente da
              Stripe.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {selectedPlan ? (
              <SelectedPlanCard plan={selectedPlan} />
            ) : (
              <div
                className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
                role="alert"
              >
                Nenhum plano foi selecionado para continuar.
              </div>
            )}

            <PaymentMethodList methods={ACCEPTED_PAYMENT_METHODS} />
            <SecurityNotice />

            <CheckoutAction
              isLoading={isLoading}
              errorMessage={errorMessage}
              onContinue={continueToPayment}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
