import { X } from 'lucide-react'

import { SecondaryButton } from '../../../../shared/components/SecondaryButton'
import { ProductActions } from '../components/ProductActions'
import { ProductDetailFeedback } from '../components/ProductDetailFeedback'
import { ProductDetailHeader } from '../components/ProductDetailHeader'
import { ProductGalleryPlaceholder } from '../components/ProductGalleryPlaceholder'
import { ProductInformation } from '../components/ProductInformation'
import { ProductQuantitySelector } from '../components/ProductQuantitySelector'
import { useProductDetail } from '../hooks/useProductDetail'

type ProductDetailPageProps = {
  onBackToStore: () => void
  productId: string
  storeSlug: string
  addToast?: (message: string) => void
}

export function ProductDetailPage({
  onBackToStore,
  productId,
  storeSlug,
  addToast,
}: ProductDetailPageProps) {
  const { gallery, quantity, retry, state } = useProductDetail(storeSlug, productId)

  const handleBackToStore = () => {
    quantity.reset()
    onBackToStore()
  }

  const handleAddToCart = () => {
    if (state.status !== 'success') return

    const product = state.product
    const qty = quantity.value

    const rawCart = localStorage.getItem('pedeaqui:cart:stores')
    let cartStores: any[] = []
    if (rawCart) {
      try {
        cartStores = JSON.parse(rawCart)
      } catch {
        cartStores = []
      }
    }

    let storeCart = cartStores.find((s: any) => s.id === product.storeId)
    const price = (product.promoPriceCents ?? product.priceCents) / 100

    const newCartItem = {
      id: product.id,
      name: product.name,
      price,
      quantity: qty,
      image: "🍔",
      category: product.categoryName || 'Geral',
    }

    if (storeCart) {
      const existingItem = storeCart.items.find((item: any) => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += qty
      } else {
        storeCart.items.push(newCartItem)
      }
    } else {
      storeCart = {
        id: product.storeId,
        name: product.storeName,
        logo: '🏬',
        category: product.categoryName || 'Restaurante',
        rating: '4.8',
        deliveryTime: '20-35 min',
        deliveryFee: 4.90,
        isOpen: true,
        color: 'border-red-100 hover:border-red-200 bg-red-50/10',
        phone: '5586999999999',
        items: [newCartItem],
      }
      cartStores.push(storeCart)
    }

    localStorage.setItem('pedeaqui:cart:stores', JSON.stringify(cartStores))
    addToast?.(`Adicionado ao carrinho: ${qty}x ${product.name}`)
    handleBackToStore()
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <ProductDetailHeader />

      {state.status === 'loading' ? <ProductDetailFeedback status="loading" /> : null}

      {state.status === 'error' ? (
        <ProductDetailFeedback
          message={state.message}
          onBack={handleBackToStore}
          onRetry={retry}
          status="error"
        />
      ) : null}

      {state.status === 'unavailable' ? (
        <ProductDetailFeedback
          description={
            state.reason === 'store'
              ? 'Esta loja não está disponível ou o endereço informado não existe.'
              : 'O produto não existe, foi removido ou não pertence a esta loja.'
          }
          onBack={handleBackToStore}
          status="unavailable"
          title={state.reason === 'store' ? 'Loja indisponível' : 'Produto indisponível'}
        />
      ) : null}

      {state.status === 'success' ? (
        <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:px-8 lg:py-12">
          <div className="lg:col-span-2">
            <div className="flex justify-end">
              <SecondaryButton
                aria-label="Voltar para a loja"
                className="text-gray-500"
                onClick={handleBackToStore}
                size="icon"
                type="button"
              >
                <X aria-hidden="true" size={18} />
              </SecondaryButton>
            </div>
          </div>
          <ProductGalleryPlaceholder
            currentIndex={gallery.currentIndex}
            itemCount={gallery.itemCount}
            onNext={gallery.showNextImage}
            onPrevious={gallery.showPreviousImage}
          />
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <ProductInformation product={state.product} />
            <div className="mt-8 border-t border-gray-200 pt-6">
              <ProductQuantitySelector
                onDecrease={quantity.decrease}
                onIncrease={quantity.increase}
                onValueChange={quantity.setValue}
                value={quantity.value}
              />
              <div className="mt-6">
                <ProductActions
                  onBack={handleBackToStore}
                  onAddToCart={handleAddToCart}
                  isAvailable={state.product.available}
                />
              </div>
            </div>
          </div>
        </main>
      ) : null}
    </div>
  )
}
