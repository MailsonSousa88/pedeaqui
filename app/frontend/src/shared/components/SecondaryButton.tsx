import type { HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'

export type SecondaryButtonProps = HTMLMotionProps<'button'> & {
  size?: 'md' | 'icon'
}

export function SecondaryButton({
  children,
  className = '',
  size = 'md',
  ...props
}: SecondaryButtonProps) {
  const sizeClassName = size === 'icon' ? 'h-10 w-10 shrink-0 p-0' : 'px-5 py-3'

  return (
    <motion.button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-[#111111] transition-all hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${sizeClassName} ${className}`.trim()}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
