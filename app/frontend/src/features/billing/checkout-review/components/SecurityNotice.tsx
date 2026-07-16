import { ShieldCheck } from 'lucide-react'

export function SecurityNotice() {
  return (
    <section className="rounded-2xl border border-green-100 bg-green-50 p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-600">
          <ShieldCheck size={20} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#111111]">Ativacao gratuita</h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            Sua loja sera criada com 30 dias de acesso gratuito. A assinatura Stripe
            sera integrada em uma proxima etapa.
          </p>
        </div>
      </div>
    </section>
  )
}
