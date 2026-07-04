import type { StorefrontInfoItem as StorefrontInfoItemType } from '../types/storefront'

import { StoreInfoItem } from './StoreInfoItem'

const storefrontInfoItems: StorefrontInfoItemType[] = [
  { key: 'businessHours', label: 'Funcionamento' },
  { key: 'address', label: 'Endereço' },
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'email', label: 'E-mail' },
]

export function StoreInfoList() {
  return (
    <div className="mt-6 rounded-2xl border border-gray-100 bg-white px-4 py-1">
      {storefrontInfoItems.map((item) => (
        <StoreInfoItem item={item} key={item.key} />
      ))}
    </div>
  )
}
