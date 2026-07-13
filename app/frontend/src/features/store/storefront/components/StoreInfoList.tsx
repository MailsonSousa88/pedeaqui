import type { StorefrontInfoItem as StorefrontInfoItemType, StorefrontStore } from '../types/storefront'

import { StoreInfoItem } from './StoreInfoItem'

type StoreInfoListProps = {
  isLoading?: boolean
  store: StorefrontStore | null
}

const formatWhatsapp = (value: string) => {
  const digits = value.replace(/\D/g, '')

  if (digits.length === 11) {
    return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  }

  if (digits.length === 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
  }

  return value
}

const formatAddress = (store: StorefrontStore | null) => {
  if (!store?.endereco) {
    return null
  }

  const normalizedAddress = store.endereco.toLocaleLowerCase('pt-BR')
  const alreadyIncludesLocation =
    normalizedAddress.includes(store.city.toLocaleLowerCase('pt-BR')) &&
    normalizedAddress.includes(store.state.toLocaleLowerCase('pt-BR'))

  return alreadyIncludesLocation
    ? store.endereco
    : `${store.endereco}, ${store.city} - ${store.state}`
}

const getStorefrontInfoItems = (store: StorefrontStore | null): StorefrontInfoItemType[] => [
  {
    key: 'businessHours',
    label: 'Funcionamento',
    value:
      store?.horarioAbertura && store.horarioFechamento
        ? `${store.horarioAbertura} às ${store.horarioFechamento}`
        : null,
  },
  { key: 'address', label: 'Endereço', value: formatAddress(store) },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: store?.whatsappNumber ? formatWhatsapp(store.whatsappNumber) : null,
  },
  { key: 'email', label: 'E-mail', value: null },
]

export function StoreInfoList({ isLoading = false, store }: StoreInfoListProps) {
  const storefrontInfoItems = getStorefrontInfoItems(store)

  return (
    <div className="mt-6 rounded-2xl border border-gray-100 bg-white px-4 py-1">
      {storefrontInfoItems.map((item) => (
        <StoreInfoItem isLoading={isLoading} item={item} key={item.key} />
      ))}
    </div>
  )
}
