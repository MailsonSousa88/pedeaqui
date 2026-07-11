import React from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  CreditCard,
  QrCode,
  Coins,
  FileText,
  ShieldCheck,
} from "lucide-react";
import type { StoreCart, ActiveStoreStats } from "../types/cart";
import { CheckoutProgress } from "./CheckoutProgress";

interface CheckoutFormProps {
  store: StoreCart;
  stats: ActiveStoreStats;
  fullName: string;
  setFullName: (v: string) => void;
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
  addressStreet: string;
  setAddressStreet: (v: string) => void;
  addressNumber: string;
  setAddressNumber: (v: string) => void;
  addressNeighborhood: string;
  setAddressNeighborhood: (v: string) => void;
  addressReference: string;
  setAddressReference: (v: string) => void;
  addressCity: string;
  setAddressCity: (v: string) => void;
  addressState: string;
  setAddressState: (v: string) => void;
  orderObservation: string;
  setOrderObservation: (v: string) => void;
  validationErrors: { [key: string]: string };
  clearError: (field: string) => void;
  isPlacingOrder: boolean;
  checkoutStep: number;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CheckoutForm({
  store,
  stats,
  fullName, setFullName,
  paymentMethod, setPaymentMethod,
  addressStreet, setAddressStreet,
  addressNumber, setAddressNumber,
  addressNeighborhood, setAddressNeighborhood,
  addressReference, setAddressReference,
  addressCity, setAddressCity,
  addressState, setAddressState,
  orderObservation, setOrderObservation,
  validationErrors,
  clearError,
  isPlacingOrder,
  checkoutStep,
  onBack,
  onSubmit,
}: CheckoutFormProps) {
  return (
    <div className="flex-1 min-h-0 w-full relative flex items-center justify-center px-4 pt-4 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:p-6 bg-[#fbfbfd] overflow-hidden">
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

      {/* Centered checkout card, inspired by success screen layout */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl max-h-full overflow-y-auto overscroll-contain bg-white rounded-3xl border border-[#e5e7eb]/80 shadow-xl p-6 sm:p-8 z-10 text-center flex flex-col"
      >
        {isPlacingOrder ? (
          <CheckoutProgress step={checkoutStep} />
        ) : (
          <>
            {/* Header info */}
            <div className="flex items-center gap-3 justify-center mb-6 border-b border-gray-100 pb-5">
              <span className="text-3xl">{store.logo}</span>
              <div className="text-left">
                <span className="text-[10px] uppercase font-extrabold text-[#e30507] tracking-wider">Finalização do Pedido</span>
                <h3 className="text-lg font-black text-gray-900 tracking-tight leading-none mt-1">
                  {store.name}
                </h3>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6 text-left">
              {/* Order Items Summary */}
              <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
                  Resumo dos Produtos
                </h4>
                <div className="divide-y divide-gray-100 max-h-[140px] overflow-y-auto pr-1">
                  {store.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 text-xs">
                      <span className="text-gray-700">
                        <span className="font-extrabold text-gray-900">{item.quantity}x</span> {item.name}
                      </span>
                      <span className="font-bold text-gray-900 shrink-0 ml-3">
                        R$ {(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-xs font-black text-gray-500 uppercase">Total do Pedido</span>
                  <span className="text-lg font-black text-gray-900">
                    R$ {stats.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Identificação */}
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-xs font-black text-gray-900 uppercase tracking-wide">
                  <User className="w-3.5 h-3.5 text-[#e30507]" />
                  Identificação
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (validationErrors.fullName) {
                        clearError("fullName");
                      }
                    }}
                    placeholder="Ex: Mateus Silva"
                    className={`w-full px-3.5 py-3 bg-white border ${validationErrors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 hover:border-gray-300 focus:border-[#e30507] focus:ring-[#e30507]/10"
                      } rounded-xl text-xs focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400`}
                  />
                  {validationErrors.fullName && (
                    <p className="text-[10px] font-semibold text-red-500 mt-0.5">{validationErrors.fullName}</p>
                  )}
                </div>
              </div>

              {/* Address Fields */}
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-xs font-black text-gray-900 uppercase tracking-wide">
                  <MapPin className="w-3.5 h-3.5 text-[#e30507]" />
                  Endereço de Entrega
                </div>

                <div className="grid grid-cols-12 gap-3">
                  {/* Endereço / Rua */}
                  <div className="col-span-8 sm:col-span-9 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Rua / Avenida <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressStreet}
                      onChange={(e) => {
                        setAddressStreet(e.target.value);
                        if (validationErrors.addressStreet) {
                          clearError("addressStreet");
                        }
                      }}
                      placeholder="Ex: Av. Aderson Ferreira"
                      className={`w-full px-3.5 py-3 bg-white border ${validationErrors.addressStreet ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 hover:border-gray-300 focus:border-[#e30507] focus:ring-[#e30507]/10"
                        } rounded-xl text-xs focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400`}
                    />
                    {validationErrors.addressStreet && (
                      <p className="text-[10px] font-semibold text-red-500 mt-0.5">{validationErrors.addressStreet}</p>
                    )}
                  </div>

                  {/* Número */}
                  <div className="col-span-4 sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Número <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressNumber}
                      onChange={(e) => {
                        setAddressNumber(e.target.value);
                        if (validationErrors.addressNumber) {
                          clearError("addressNumber");
                        }
                      }}
                      placeholder="Ex: 123"
                      className={`w-full px-3.5 py-3 bg-white border ${validationErrors.addressNumber ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 hover:border-gray-300 focus:border-[#e30507] focus:ring-[#e30507]/10"
                        } rounded-xl text-xs focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400`}
                    />
                    {validationErrors.addressNumber && (
                      <p className="text-[10px] font-semibold text-red-500 mt-0.5">{validationErrors.addressNumber}</p>
                    )}
                  </div>

                  {/* Bairro */}
                  <div className="col-span-6 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Bairro <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressNeighborhood}
                      onChange={(e) => {
                        setAddressNeighborhood(e.target.value);
                        if (validationErrors.addressNeighborhood) {
                          clearError("addressNeighborhood");
                        }
                      }}
                      placeholder="Ex: Paciência"
                      className={`w-full px-3.5 py-3 bg-white border ${validationErrors.addressNeighborhood ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 hover:border-gray-300 focus:border-[#e30507] focus:ring-[#e30507]/10"
                        } rounded-xl text-xs focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400`}
                    />
                    {validationErrors.addressNeighborhood && (
                      <p className="text-[10px] font-semibold text-red-500 mt-0.5">{validationErrors.addressNeighborhood}</p>
                    )}
                  </div>

                  {/* Ponto de Referência */}
                  <div className="col-span-6 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Ponto de Referência
                    </label>
                    <input
                      type="text"
                      value={addressReference}
                      onChange={(e) => {
                        setAddressReference(e.target.value);
                        if (validationErrors.addressReference) {
                          clearError("addressReference");
                        }
                      }}
                      placeholder="Ex: Próximo à Igreja Matriz"
                      className={`w-full px-3.5 py-3 bg-white border ${validationErrors.addressReference ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 hover:border-gray-300 focus:border-[#e30507] focus:ring-[#e30507]/10"
                        } rounded-xl text-xs focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400`}
                    />
                    {validationErrors.addressReference && (
                      <p className="text-[10px] font-semibold text-red-500 mt-0.5">{validationErrors.addressReference}</p>
                    )}
                  </div>

                  {/* Cidade */}
                  <div className="col-span-8 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Cidade <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressCity}
                      onChange={(e) => {
                        setAddressCity(e.target.value);
                        if (validationErrors.addressCity) {
                          clearError("addressCity");
                        }
                      }}
                      placeholder="Ex: Piripiri"
                      className={`w-full px-3.5 py-3 bg-white border ${validationErrors.addressCity ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 hover:border-gray-300 focus:border-[#e30507] focus:ring-[#e30507]/10"
                        } rounded-xl text-xs focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400`}
                    />
                    {validationErrors.addressCity && (
                      <p className="text-[10px] font-semibold text-red-500 mt-0.5">{validationErrors.addressCity}</p>
                    )}
                  </div>

                  {/* Estado */}
                  <div className="col-span-4 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Estado <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={addressState}
                      onChange={(e) => {
                        setAddressState(e.target.value);
                        if (validationErrors.addressState) {
                          clearError("addressState");
                        }
                      }}
                      placeholder="Ex: PI"
                      maxLength={2}
                      className={`w-full px-3.5 py-3 bg-white border ${validationErrors.addressState ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 hover:border-gray-300 focus:border-[#e30507] focus:ring-[#e30507]/10"
                        } rounded-xl text-xs focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400 uppercase`}
                    />
                    {validationErrors.addressState && (
                      <p className="text-[10px] font-semibold text-red-500 mt-0.5">{validationErrors.addressState}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Método de Pagamento */}
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-xs font-black text-gray-900 uppercase tracking-wide">
                  <CreditCard className="w-3.5 h-3.5 text-[#e30507]" />
                  Forma de Pagamento <span className="text-red-500">*</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod("pix");
                      if (validationErrors.paymentMethod) {
                        clearError("paymentMethod");
                      }
                    }}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${paymentMethod === "pix"
                      ? "border-[#e30507] bg-red-50/50 text-[#e30507] ring-2 ring-[#e30507]/10"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 text-gray-600"
                      }`}
                  >
                    <QrCode className="w-5 h-5 mb-1.5 text-[#e30507]" />
                    <span className="text-xs font-bold">Pix</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod("cartao");
                      if (validationErrors.paymentMethod) {
                        clearError("paymentMethod");
                      }
                    }}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${paymentMethod === "cartao"
                      ? "border-[#e30507] bg-red-50/50 text-[#e30507] ring-2 ring-[#e30507]/10"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 text-gray-600"
                      }`}
                  >
                    <CreditCard className="w-5 h-5 mb-1.5 text-[#e30507]" />
                    <span className="text-xs font-bold">Cartão</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod("dinheiro");
                      if (validationErrors.paymentMethod) {
                        clearError("paymentMethod");
                      }
                    }}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${paymentMethod === "dinheiro"
                      ? "border-[#e30507] bg-red-50/50 text-[#e30507] ring-2 ring-[#e30507]/10"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 text-gray-600"
                      }`}
                  >
                    <Coins className="w-5 h-5 mb-1.5 text-[#e30507]" />
                    <span className="text-xs font-bold">Dinheiro</span>
                  </button>
                </div>
                {validationErrors.paymentMethod && (
                  <p className="text-[10px] font-semibold text-red-500 mt-0.5">{validationErrors.paymentMethod}</p>
                )}
              </div>

              {/* Observation Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#e30507]" />
                  Observações do Pedido
                </label>
                <textarea
                  value={orderObservation}
                  onChange={(e) => {
                    setOrderObservation(e.target.value);
                    if (validationErrors.orderObservation) {
                      clearError("orderObservation");
                    }
                  }}
                  placeholder="Ex: troco para 50, sem cebola, entregar no portão..."
                  rows={3}
                  className={`w-full px-4 py-3 bg-white border ${validationErrors.orderObservation ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 hover:border-gray-300 focus:border-[#e30507] focus:ring-[#e30507]/10"
                    } rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400 resize-none`}
                />
                {validationErrors.orderObservation && (
                  <p className="text-[10px] font-semibold text-red-500 mt-0.5">{validationErrors.orderObservation}</p>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full min-h-[52px] px-4 py-3.5 bg-[#e30507] hover:bg-red-600 text-white font-black text-xs sm:text-sm leading-tight rounded-2xl transition-all cursor-pointer shadow-lg shadow-red-500/10 flex items-center justify-center gap-2 text-center"
                >
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span className="min-w-0">
                    Confirmar Pedido (R$ {stats.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onBack}
                  className="w-full py-2.5 bg-transparent hover:bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-800 font-extrabold text-xs rounded-xl transition-all cursor-pointer text-center"
                >
                  Voltar para o Carrinho
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
