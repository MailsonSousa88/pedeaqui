import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckoutProgressProps {
  step: number; // 1 | 2 | 3
}

export function CheckoutProgress({ step }: CheckoutProgressProps) {
  return (
    <div className="py-6 flex flex-col items-center">
      {/* Loader Spinner */}
      <div className="relative w-16 h-16 flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-red-50 animate-ping" />
        <div className="w-14 h-14 rounded-full border-4 border-t-[#e30507] border-red-100 animate-spin" />
      </div>

      <h4 className="text-lg font-black text-gray-800 tracking-tight">
        {step === 1
          ? "Transmitindo pedido ao estabelecimento..."
          : step === 2
            ? "Verificando disponibilidade de estoque..."
            : "Finalizando seu pedido com segurança..."}
      </h4>

      <p className="text-xs text-gray-400 mt-2 max-w-xs mx-auto leading-relaxed">
        Por favor, não feche esta janela ou recarregue a página. Estamos transmitindo os detalhes do seu pedido.
      </p>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full mt-6 relative overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{
            width:
              step === 1 ? "33%" : step === 2 ? "66%" : "100%"
          }}
          transition={{ duration: 0.5 }}
          className="h-full bg-[#e30507] rounded-full"
        />
      </div>

      {/* Progress Steps Indicators */}
      <div className="mt-8 space-y-3.5 text-left w-full max-w-xs mx-auto">
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? "bg-[#e30507] text-white" : "bg-gray-100 text-gray-400"
            }`}>
            {step > 1 ? <Check className="w-3 h-3" /> : "1"}
          </div>
          <span className={`text-xs font-bold ${step >= 1 ? "text-gray-800" : "text-gray-400"}`}>
            Transmitindo pedido ao estabelecimento
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? "bg-[#e30507] text-white" : "bg-gray-100 text-gray-400"
            }`}>
            {step > 2 ? <Check className="w-3 h-3" /> : "2"}
          </div>
          <span className={`text-xs font-bold ${step >= 2 ? "text-gray-800" : "text-gray-400"}`}>
            Verificando disponibilidade de estoque
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 3 ? "bg-[#e30507] text-white" : "bg-gray-100 text-gray-400"
            }`}>
            3
          </div>
          <span className={`text-xs font-bold ${step >= 3 ? "text-gray-800" : "text-gray-400"}`}>
            Confirmando horário e rota de entrega
          </span>
        </div>
      </div>
    </div>
  );
}
