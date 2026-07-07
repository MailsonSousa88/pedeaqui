import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface RetryOverlayProps {
  isVisible: boolean;
}

export default function RetryOverlay({ isVisible }: RetryOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#f5f5f5]/80 backdrop-blur-sm z-45 flex flex-col items-center justify-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="text-[#e30507]"
          >
            <Loader2 className="w-12 h-12 stroke-[3]" />
          </motion.div>
          <p className="font-bold text-gray-800 text-sm tracking-wide">
            Processando tentativa de pagamento...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
