export type StorefrontTabKey = 'products' | 'add' | 'categories'

export type StorefrontTab = {
  key: StorefrontTabKey
  label: string
}

export type StorefrontInfoKey = 'businessHours' | 'address' | 'whatsapp' | 'email'

export type StorefrontInfoItem = {
  key: StorefrontInfoKey
  label: string
}

export type ImagePlaceholderVariant = 'banner' | 'avatar' | 'product'

export type ImagePlaceholderTone = 'brand' | 'neutral'
