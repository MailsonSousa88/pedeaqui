import { ImageIcon, Store } from 'lucide-react'
import { useState } from 'react'

import type {
  ImagePlaceholderTone,
  ImagePlaceholderVariant,
} from '../types/storefront'

type ImagePlaceholderProps = {
  alt?: string
  className?: string
  label: string
  src?: string | null
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
  alt,
  className = '',
  label,
  src,
  tone = 'neutral',
  variant,
}: ImagePlaceholderProps) {
  const Icon = variant === 'avatar' ? Store : ImageIcon
  const [hasImageError, setHasImageError] = useState(false)
  const combinedClassName = [
    'flex shrink-0 items-center justify-center overflow-hidden',
    variantClassNames[variant],
    toneClassNames[tone],
    className,
  ].join(' ')

  if (src && !hasImageError) {
    return (
      <img
        alt={alt || label}
        className={`${combinedClassName} object-cover`}
        onError={() => setHasImageError(true)}
        src={src}
      />
    )
  }

  return (
    <div
      aria-label={label}
      className={combinedClassName}
      role="img"
    >
      <Icon aria-hidden="true" size={variant === 'banner' ? 40 : 28} strokeWidth={1.8} />
    </div>
  )
}
