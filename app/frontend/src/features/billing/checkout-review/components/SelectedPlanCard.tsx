import { CheckCircle2, Store } from "lucide-react";

import type { PlanSummary } from "../types/checkoutReview";

type SelectedPlanCardProps = {
  plan: PlanSummary;
};

export function SelectedPlanCard({ plan }: SelectedPlanCardProps) {
  return (
    <section
      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="selected-plan-title"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0f0] text-[#e30507]">
            <Store size={22} aria-hidden="true" />
          </div>
          <div>
            <h2
              id="selected-plan-title"
              className="text-lg font-semibold text-[#111111]"
            >
              {plan.name}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{plan.billingLabel}</p>
          </div>
        </div>

        <p className="text-right text-xl font-bold text-[#e30507]">
          {plan.priceLabel}
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {plan.benefits.map((benefit) => (
          <li
            key={benefit.id}
            className="flex items-center gap-3 text-sm font-medium text-gray-700"
          >
            <CheckCircle2
              size={16}
              className="shrink-0 text-[#e30507]"
              aria-hidden="true"
            />
            {benefit.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
