import { motion } from "framer-motion";
import {
  Check,
  User,
  CreditCard,
  QrCode,
  Coins,
  MapPin,
  FileText,
} from "lucide-react";
import type { CompletedOrder } from "../types/cart";

interface OrderSuccessCardProps {
  order: CompletedOrder;
  onBack: () => void;
}

export function OrderSuccessCard({ order, onBack: _onBack }: OrderSuccessCardProps) {
  return (
    <div className="flex-1 w-full relative flex items-center justify-center py-10 px-4 sm:px-10 bg-[#fbfbfd]">
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

      {/* Center Success Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white rounded-3xl border border-[#e5e7eb]/80 shadow-xl p-6 sm:p-8 z-10 text-center flex flex-col items-center"
      >
        {/* Check Circle */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-5">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-16 h-16 rounded-full border-[3px] border-emerald-500 flex items-center justify-center bg-emerald-50/50 shadow-sm"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.1 }}
              className="text-emerald-500"
            >
              <Check className="w-8 h-8 stroke-[3]" />
            </motion.div>
          </motion.div>
        </div>

        <h1 className="text-xl sm:text-2xl leading-tight font-black text-gray-900 tracking-tight mb-1">
          Pedido <span className="text-emerald-500">Confirmado</span>!
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm leading-relaxed mb-6">
          Sua solicitação no estabelecimento <span className="font-extrabold text-gray-800">{order.storeName} {order.storeLogo}</span> foi confirmada e já está sendo preparada!
        </p>

        {/* Details list block */}
        <div className="w-full text-left space-y-4 bg-gray-50/50 border border-gray-100 rounded-2xl p-5 mb-6">
          <div>
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Itens do Pedido</span>
            <div className="mt-1.5 space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div key={item.id} className="text-xs flex justify-between">
                  <span className="text-gray-600 font-bold">
                    {item.quantity}x <span className="font-medium text-gray-700">{item.name}</span>
                  </span>
                  <span className="text-gray-900 font-bold">
                    R$ {(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200/60 pt-3">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
              <User className="w-3 h-3 text-[#e30507]" /> Cliente
            </span>
            <p className="text-xs font-bold text-gray-800 mt-1 leading-relaxed pl-4">
              {order.fullName}
            </p>
          </div>

          <div className="border-t border-gray-200/60 pt-3">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-[#e30507]" /> Forma de Pagamento
            </span>
            <div className="flex items-center gap-1.5 mt-1 pl-4">
              {order.paymentMethod === "pix" && (
                <>
                  <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-bold text-gray-800">Pix</span>
                </>
              )}
              {order.paymentMethod === "cartao" && (
                <>
                  <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-bold text-gray-800">Cartão de Crédito/Débito</span>
                </>
              )}
              {order.paymentMethod === "dinheiro" && (
                <>
                  <Coins className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-xs font-bold text-gray-800">Dinheiro</span>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200/60 pt-3 flex justify-between items-center">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
              {order.paymentMethod === "pix"
                ? "Total via Pix"
                : order.paymentMethod === "cartao"
                  ? "Total no Cartão"
                  : order.paymentMethod === "dinheiro"
                    ? "Total em Dinheiro"
                    : "Total do Pedido"}
            </span>
            <span className="text-lg font-black text-[#e30507]">
              R$ {order.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="border-t border-gray-200/60 pt-3">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#e30507]" /> Endereço Informado
            </span>
            <p className="text-xs font-bold text-gray-800 mt-1 leading-relaxed pl-4">
              {order.address}
            </p>
          </div>

          {order.observation && (
            <div className="border-t border-gray-200/60 pt-3">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
                <FileText className="w-3 h-3 text-gray-400" /> Observações do Pedido
              </span>
              <p className="text-xs italic text-gray-600 mt-1 pl-4 leading-relaxed">
                "{order.observation}"
              </p>
            </div>
          )}


        </div>

      </motion.div>
    </div>
  );
}
