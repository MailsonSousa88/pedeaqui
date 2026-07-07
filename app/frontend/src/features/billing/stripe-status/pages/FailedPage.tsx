import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, AlignLeft, ShieldCheck, Info } from "lucide-react";
import Logo from "../../../../shared/components/Logo";
import type { FailedPageProps } from "../types/billing.types";

export default function FailedPage({
  onTryAgain,
  onBackToPlans
}: FailedPageProps) {
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

          {/* Centered Card (exactly mirroring register design but with failed content) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-full max-w-[480px] bg-white rounded-3xl border border-[#e5e7eb]/80 shadow-lg p-6 sm:p-10 z-10 text-center flex flex-col items-center"
          >
            {/* Center Animated Circle Graphics */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-5">
              {/* Decorative floating red shapes */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 0.8 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute top-4 left-6 w-3 h-3 border border-[#ef4444]/50 rotate-12"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 0.8 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="absolute top-3 right-8 w-2 h-2 rounded-full bg-[#ef4444]/40"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 0.8 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-8 left-4 w-2 h-2 rounded-sm bg-[#ef4444]/30 rotate-45"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 0.8 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-6 right-8 w-3 h-3 border border-[#ef4444]/40"
              />

              {/* Main Warning Ring */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.1
                }}
                className="w-24 h-24 rounded-full border-[3px] border-[#ef4444] flex items-center justify-center bg-white shadow-sm"
              >
                {/* Inner exclamation animated */}
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                    delay: 0.25
                  }}
                  className="text-[#ef4444]"
                >
                  <AlertTriangle className="w-12 h-12 stroke-[2.5]" />
                </motion.div>
              </motion.div>
            </div>

            {/* Heading & Subtitle */}
            <h1 className="text-2xl sm:text-[26px] leading-tight font-bold text-[#111827] tracking-tight mb-2">
              Pagamento <span className="text-[#ef4444]">não concluído</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-[340px] leading-relaxed mb-6">
              Seu pagamento não foi finalizado. Você pode tentar novamente ou escolher outro plano.
            </p>

            {/* Info Warning Card */}
            <div className="w-full bg-[#fffbeb] border border-[#fef3c7] rounded-2xl p-4 sm:p-5 mb-6 flex gap-3 text-left">
              <div className="text-amber-500 shrink-0 mt-0.5">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#92400e] mb-0.5">
                  Nenhuma cobrança foi confirmada
                </h4>
                <p className="text-xs text-[#b45309] leading-relaxed">
                  pelo PedeAqui neste momento.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="w-full space-y-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onTryAgain}
                className="w-full h-12 bg-[#e30507] hover:bg-[#b80406] active:bg-[#b80406] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer text-sm"
              >
                <RefreshCw className="w-4.5 h-4.5 stroke-[2.5]" />
                Tentar novamente
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onBackToPlans}
                className="group w-full h-12 bg-white hover:bg-red-50/30 text-gray-700 font-bold rounded-xl border border-[#e5e7eb] hover:border-[#e30507] flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
              >
                <AlignLeft className="w-4.5 h-4.5 stroke-[2.5] group-hover:text-[#e30507] transition-colors" />
                <span className="group-hover:underline group-hover:decoration-[#e30507] group-hover:decoration-2 group-hover:underline-offset-4 transition-all">
                  Voltar aos planos
                </span>
              </motion.button>
            </div>

            {/* Footer Guarantee */}
            <div className="w-full pt-4 border-t border-gray-100 flex items-start gap-3 text-left">
              <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-[11px] text-gray-400 leading-normal">
                <span className="font-semibold text-gray-600 block mb-0.5">Pagamento seguro com a Stripe</span>
                O pagamento é realizado no ambiente seguro da <span className="font-semibold text-[#e30507]">Stripe</span> Checkout. Seus dados estão protegidos.
              </p>
            </div>
          </motion.div>
        </div>
    </motion.div>
  );
}
