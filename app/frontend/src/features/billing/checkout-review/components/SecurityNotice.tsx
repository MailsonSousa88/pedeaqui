import { ShieldCheck } from "lucide-react";

export function SecurityNotice() {
  return (
    <section className="rounded-2xl border border-green-100 bg-green-50 p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-600">
          <ShieldCheck size={20} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#111111]">
            Pagamento 100% seguro
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            Processado com segurança pela Stripe. Seus dados financeiros não
            são armazenados pelo PedeAqui.
          </p>
        </div>
      </div>
    </section>
  );
}
