import { motion } from 'framer-motion'
import { PackageSearch } from 'lucide-react'

type ManageProductsCardProps = {
  onClick: () => void
}

export function ManageProductsCard({ onClick }: ManageProductsCardProps) {
  return (
    <motion.button
      aria-label="Gerenciar produtos"
      className="group flex w-full flex-col items-start gap-5 rounded-2xl border border-dashed border-[#e30507]/40 bg-white p-6 text-left shadow-sm transition-colors hover:border-[#e30507] hover:bg-[#fff0f0]/40 focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2 sm:p-8"
      onClick={onClick}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0f0] text-[#e30507] transition-transform group-hover:scale-105">
        <PackageSearch aria-hidden="true" size={24} strokeWidth={2.2} />
      </span>

      <span className="flex flex-col gap-2">
        <span className="text-lg font-bold text-[#111111]">Gerenciar produtos</span>
        <span className="max-w-xl text-sm leading-6 text-[#6b7280]">
          Consulte os produtos já cadastrados, acesse a edição e prepare ações de
          disponibilidade ou remoção quando a loja estiver conectada.
        </span>
      </span>
    </motion.button>
  )
}
