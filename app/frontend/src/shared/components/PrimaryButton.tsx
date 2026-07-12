import type { HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'

export type PrimaryButtonProps = HTMLMotionProps<'button'>

export function PrimaryButton({ children, className = '', ...props }: PrimaryButtonProps) {
  return (
    <motion.button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#e30507] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b80406] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${className}`.trim()}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
