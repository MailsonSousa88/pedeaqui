import { ImageIcon, Store } from 'lucide-react'

import type {
  ImagePlaceholderTone,
  ImagePlaceholderVariant,
} from '../types/storefront'

type ImagePlaceholderProps = {
  className?: string
  label: string
  tone?: ImagePlaceholderTone
  variant: ImagePlaceholderVariant
}

const variantClassNames: Record<ImagePlaceholderVariant, string> = {
  avatar: 'size-28 rounded-3xl border-4 border-white shadow-lg',
  banner: 'h-44 w-full rounded-t-3xl',
  product: 'size-24 rounded-2xl',
}

const toneClassNames: Record<ImagePlaceholderTone, string> = {
  brand: 'bg-[#fff0f0] text-[#e30507]',
  neutral: 'bg-gray-100 text-gray-400',
}

export function ImagePlaceholder({
  className = '',
  label,
  tone = 'neutral',
  variant,
}: ImagePlaceholderProps) {
  const Icon = variant === 'avatar' ? Store : ImageIcon

  return (
    <div
      aria-label={label}
      className={[
        'flex shrink-0 items-center justify-center overflow-hidden',
        variantClassNames[variant],
        toneClassNames[tone],
        className,
      ].join(' ')}
      role="img"
    >
      <Icon aria-hidden="true" size={variant === 'banner' ? 40 : 28} strokeWidth={1.8} />
    </div>
  )
}
