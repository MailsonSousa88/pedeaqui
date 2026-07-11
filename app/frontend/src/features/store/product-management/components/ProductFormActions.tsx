import { motion } from 'framer-motion'
import { Save, X } from 'lucide-react'

import type { ProductFormActionHandlers } from '../types/productManagement'

export function ProductFormActions({
  onCancel,
  onSave,
  saveLabel = 'Salvar produto',
}: ProductFormActionHandlers) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
      <motion.button
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition-all hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
        onClick={onCancel}
        transition={{ duration: 0.2 }}
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <X aria-hidden="true" size={16} />
        Cancelar
      </motion.button>

      <motion.button
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e30507] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b80406] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
        onClick={onSave}
        transition={{ duration: 0.2 }}
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Save aria-hidden="true" size={16} />
        {saveLabel}
      </motion.button>
    </div>
  )
}
