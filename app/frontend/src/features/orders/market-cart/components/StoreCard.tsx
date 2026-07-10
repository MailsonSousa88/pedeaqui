import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { StoreCart } from "../types/cart";

interface StoreCardProps {
  store: StoreCart;
  isSelected: boolean;
  onSelect: (storeId: string) => void;
}

export function StoreCard({ store, isSelected, onSelect }: StoreCardProps) {
  const storeItemsCount = store.items.reduce((sum, item) => sum + item.quantity, 0);
  const storeSubtotal = store.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Do not show store card if it has no items
  if (storeItemsCount === 0) return null;

  return (
    <motion.div
      layoutId={`store-card-${store.id}`}
      onClick={() => onSelect(store.id)}
      className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden bg-white ${isSelected
          ? "border-[#e30507] shadow-lg shadow-red-500/5 ring-2 ring-[#e30507]/10 bg-red-50/5"
          : "border-gray-200 hover:shadow-md"
        }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl border border-gray-100 shadow-sm shrink-0">
            {store.logo}
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
              {store.category}
            </span>
            <h3 className="font-bold text-gray-800 text-sm sm:text-base leading-snug mt-0.5">
              {store.name}
            </h3>

          </div>
        </div>

        {/* Active indicators */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="text-xs font-black text-gray-800 bg-gray-100 px-2 py-1 rounded-lg">
            {storeItemsCount} {storeItemsCount === 1 ? "item" : "itens"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-100" />

      {/* Card Footer */}
      <div className="flex items-center justify-between">
        <div className="text-left">
          <p className="text-[10px] font-bold text-gray-400 uppercase">subtotal da compra</p>
          <p className="text-base font-black text-gray-900 mt-0.5">
            R$ {storeSubtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#e30507]">
          <span>Ver Pedido</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}
