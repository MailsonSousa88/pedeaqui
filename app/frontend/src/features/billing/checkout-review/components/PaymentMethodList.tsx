import { CreditCard, QrCode } from "lucide-react";

import type { PaymentMethod } from "../types/checkoutReview";

type PaymentMethodListProps = {
  methods: PaymentMethod[];
};

const methodIcons = {
  pix: QrCode,
  "credit-card": CreditCard,
};

export function PaymentMethodList({ methods }: PaymentMethodListProps) {
  return (
    <section aria-labelledby="payment-methods-title">
      <h2
        id="payment-methods-title"
        className="text-sm font-semibold text-[#111111]"
      >
        Métodos de pagamento aceitos
      </h2>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {methods.map((method) => {
          const Icon = methodIcons[method.id];

          return (
            <article
              key={method.id}
              className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0f0] text-[#e30507]">
                <Icon size={20} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#111111]">
                  {method.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {method.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
