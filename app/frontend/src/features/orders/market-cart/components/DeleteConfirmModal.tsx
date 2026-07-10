import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import type { DeleteConfirmState } from "../types/cart";

interface DeleteConfirmModalProps {
  state: DeleteConfirmState | null;
  onCancel: () => void;
  onConfirm: (storeId: string, itemId: string) => void;
}

export function DeleteConfirmModal({ state, onCancel, onConfirm }: DeleteConfirmModalProps) {
  return (
    <AnimatePresence>
      {state?.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-gray-100"
          >
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100/50">
              <Trash2 className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-black text-gray-900 tracking-tight">
              Remover item?
            </h3>

            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              O produto será excluido, você tem certeza?
            </p>

            <p className="text-xs font-bold text-gray-400 mt-1 italic">
              "{state.itemName}"
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs rounded-xl transition-all cursor-pointer text-center"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (state) {
                    onConfirm(state.storeId, state.itemId);
                  }
                }}
                className="flex-1 py-3 bg-[#e30507] hover:bg-red-600 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer text-center shadow-md shadow-red-500/10"
              >
                Sim, excluir
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
