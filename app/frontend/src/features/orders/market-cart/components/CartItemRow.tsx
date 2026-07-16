import { Plus, Minus, Trash2 } from "lucide-react";
import type { CartItem } from "../types/cart";

interface CartItemRowProps {
  item: CartItem;
  storeId: string;
  onUpdateQuantity: (storeId: string, itemId: string, change: number) => void;
  onRemove: (storeId: string, itemId: string) => void;
}

export function CartItemRow({ item, storeId, onUpdateQuantity, onRemove }: CartItemRowProps) {
  return (
    <div
      className="flex items-center justify-between gap-4 p-3 rounded-xl border border-gray-100 hover:border-gray-200 bg-white transition-all duration-200"
    >
      {/* Product Image & Meta */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xl shrink-0">
          {item.image}
        </div>
        <div className="text-left min-w-0">
          <h5 className="font-bold text-gray-800 text-xs sm:text-sm truncate">
            {item.name}
          </h5>
          <p className="text-[11px] text-[#e30507] font-extrabold mt-0.5">
            R$ {item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Control actions & quantity */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Quantity buttons */}
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
          <button
            onClick={() => onUpdateQuantity(storeId, item.id, -1)}
            className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-2.5 text-xs font-black text-gray-800 select-none min-w-[20px] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(storeId, item.id, 1)}
            className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Row total item value */}
        <div className="text-right min-w-[65px] hidden sm:block">
          <span className="text-xs font-black text-gray-800">
            R$ {(item.price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Direct Delete */}
        <button
          onClick={() => onRemove(storeId, item.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Remover Item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
