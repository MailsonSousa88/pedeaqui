import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, ShieldCheck } from "lucide-react";
import type { StoreCart, ActiveStoreStats } from "../types/cart";
import { CartItemRow } from "./CartItemRow";

interface CartSummaryPanelProps {
  store: StoreCart;
  stats: ActiveStoreStats;
  onBack: () => void;
  onUpdateQuantity: (storeId: string, itemId: string, change: number) => void;
  onRemoveItem: (storeId: string, itemId: string) => void;
  onCheckout: () => void;
}

export function CartSummaryPanel({ store, stats, onBack, onUpdateQuantity, onRemoveItem, onCheckout }: CartSummaryPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {store ? (
        <motion.div
          key={store.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-gray-200/80 shadow-lg overflow-hidden flex flex-col"
        >
          {/* Store active banner header */}
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 -ml-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-white border border-transparent hover:border-gray-100 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="text-2xl">{store.logo}</div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Você está pedindo em:</span>
                <h3 className="font-extrabold text-gray-900 text-base sm:text-lg leading-tight">
                  {store.name}
                </h3>
              </div>
            </div>


          </div>

          {/* Items in the active store cart */}
          <div className="p-6 flex-1 border-b border-gray-100 max-h-[400px] overflow-y-auto">
            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">
              Itens do Pedido ({store.items.length})
            </h4>

            {store.items.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <p className="text-sm font-bold text-gray-400">Todos os produtos desta loja foram removidos.</p>
                <button
                  onClick={onBack}
                  className="mt-4 px-4 py-2 text-xs font-bold text-[#e30507] hover:bg-red-50 rounded-xl border border-red-100 transition-colors cursor-pointer"
                >
                  Selecionar outra Loja
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {store.items.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    storeId={store.id}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemoveItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pricing subtotal and grand checkout CTA button */}
          {store.items.length > 0 && (
            <div className="p-6 bg-white space-y-4">
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Produtos</span>
                  <span>
                    R$ {stats.subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-black text-gray-800">Total</span>
                  <span className="text-xl font-black text-[#e30507]">
                    R$ {stats.total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full mt-2 min-h-[52px] bg-[#e30507] hover:bg-red-600 text-white font-extrabold text-xs sm:text-sm px-4 py-3.5 rounded-2xl transition-colors cursor-pointer shadow-lg shadow-red-500/15 flex items-center justify-center gap-2 text-center"
                title={`Finalizar Pedido (${store.name})`}
              >
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span className="block min-w-0 truncate">
                  Finalizar Pedido ({store.name})
                </span>
              </button>
            </div>
          )}
        </motion.div>
      ) : (
        // Empty selection state on desktop
        <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-12 text-center flex flex-col items-center justify-center h-full min-h-[420px]">
          <div className="w-16 h-16 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mb-4">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-gray-700">Selecione uma loja para conferir o pedido</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            Clique em um dos cards de loja ao lado para visualizar os pratos inseridos, quantidade e finalizar as compras.
          </p>
        </div>
      )}
    </AnimatePresence>
  );
}
