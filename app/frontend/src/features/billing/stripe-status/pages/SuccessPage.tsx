import { motion } from "framer-motion";
import { Check, ShieldCheck, Store } from "lucide-react";
import Logo from "../../../../shared/components/Logo";
import type { SuccessPageProps } from "../types/billing.types";

export default function SuccessPage({
  onConfigureStore,
  onGoToDashboard,
  planName = "Plano Básico",
  planPrice = "R$ 29,99",
  billingCycle = "mês"
}: SuccessPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full min-h-screen bg-white relative flex flex-col font-sans"
    >
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 w-full px-6 sm:px-10 py-5 border-b border-gray-100 flex items-center justify-between z-30 bg-white/90 backdrop-blur-md">
          <Logo className="h-9 object-contain" />
        </div>

        {/* Content Body with decorative elements mirroring registration layout */}
        <div className="flex-1 w-full relative flex items-center justify-center pt-[calc(69px+2.5rem)] pb-10 px-4 sm:px-10 bg-[#fbfbfd]">
          
          {/* Decorative Dot Grid Top Right */}
          <div className="absolute top-6 right-10 opacity-30 pointer-events-none hidden md:block">
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              ))}
            </div>
          </div>

          {/* Decorative Dot Grid Left Middle */}
          <div className="absolute bottom-1/3 left-10 opacity-30 pointer-events-none hidden md:block">
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              ))}
            </div>
          </div>

          {/* Bottom Left Vibrant Red Curved Brand Wave Design */}
          <div className="absolute bottom-0 left-0 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] pointer-events-none select-none z-0">
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full text-[#e30507] fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 0,300 L 0,140 Q 60,140 90,200 T 220,260 Q 260,270 300,300 Z" />
            </svg>
          </div>

          {/* Centered Card (exactly mirroring register design but with success content) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-full max-w-[480px] bg-white rounded-3xl border border-[#e5e7eb]/80 shadow-lg p-6 sm:p-10 z-10 text-center flex flex-col items-center"
          >
            {/* Center Animated Circle Graphics */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-5">
              {/* Decorative floating shapes */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 0.8 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute top-2 left-6 w-2.5 h-2.5 rounded-full bg-[#10b981]/40"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 0.8 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="absolute top-10 right-4 w-2 h-2 rounded-full bg-[#10b981]/40"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 0.8 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-6 left-5 w-3 h-3 border border-[#10b981]/50 rotate-45"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 0.8 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-8 right-6 w-2 h-2 rounded-sm bg-[#10b981]/30 rotate-12"
              />

              {/* Main Ring */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.1
                }}
                className="w-24 h-24 rounded-full border-[3px] border-[#10b981] flex items-center justify-center bg-white shadow-sm"
              >
                {/* Inner check animated */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                    delay: 0.25
                  }}
                  className="text-[#10b981]"
                >
                  <Check className="w-12 h-12 stroke-[3]" />
                </motion.div>
              </motion.div>
            </div>

            {/* Heading & Subtitle */}
            <h1 className="text-2xl sm:text-[26px] leading-tight font-bold text-[#111827] tracking-tight mb-2">
              Pagamento <span className="text-[#10b981]">concluído</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-[340px] leading-relaxed mb-6">
              Seu plano foi ativado com sucesso. Agora você já pode configurar sua loja no{" "}
              <span className="text-[#e30507] font-semibold">PedeAqui</span>.
            </p>

            {/* Plan Summary Card */}
            <div className="w-full bg-[#ffffff] border border-[#e5e7eb] rounded-2xl p-4 mb-4 flex items-center justify-between shadow-sm text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#fff0f0] flex items-center justify-center text-[#e30507]">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    RESUMO DO PLANO
                  </span>
                  <h3 className="font-bold text-sm text-[#111827] leading-none">
                    {planName}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1">Cobrança mensal</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end justify-center">
                <span className="text-xs text-gray-400 line-through leading-none">
                  {planPrice}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg mt-1 whitespace-nowrap">
                  1 mês grátis
                </span>
              </div>
            </div>

            {/* Secure Transaction Tag */}
            <div className="w-full bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-4 flex gap-3 text-left mb-6">
              <div className="text-[#10b981] shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#065f46] mb-0.5">
                  Pagamento seguro
                </h4>
                <p className="text-[11px] text-[#047857] leading-relaxed">
                  A confirmação do pagamento foi processada pela{" "}
                  <span className="font-semibold text-[#e30507]">Stripe</span>. Seus dados financeiros estão protegidos.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="w-full mb-6">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onConfigureStore}
                className="w-full h-12 bg-[#e30507] hover:bg-[#b80406] active:bg-[#b80406] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer text-sm"
              >
                <Store className="w-4.5 h-4.5 stroke-[2]" />
                Configurar minha loja
              </motion.button>
            </div>

            {/* Footer Guarantee */}
            <div className="w-full pt-4 border-t border-gray-100 flex items-start gap-3 text-left">
              <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-[11px] text-gray-400 leading-normal">
                O pagamento foi realizado no ambiente seguro da Stripe. Você não precisará fazer este pagamento novamente até o próximo ciclo.
              </p>
            </div>
          </motion.div>
        </div>
    </motion.div>
  );
}
