import { useState } from 'react'
import { AlertCircle, Store } from 'lucide-react'

import { CategoryManagementPage } from '../../category-management/pages/CategoryManagementPage'
import { ProductManagementPage } from '../../product-management/pages/ProductManagementPage'
import { CategoryChips } from '../components/CategoryChips'
import { EmptyProductsArea } from '../components/EmptyProductsArea'
import { StorefrontHeader } from '../components/StorefrontHeader'
import { StoreHeroCard } from '../components/StoreHeroCard'
import { StoreTabs } from '../components/StoreTabs'
import { useStorefront } from '../hooks/useStorefront'
import { useStorefrontProducts } from '../hooks/useStorefrontProducts'
import type { StorefrontTabKey } from '../types/storefront'

type StorefrontPageProps = {
  slug?: string
}

export function StorefrontPage({ slug }: StorefrontPageProps) {
  const [activeTab, setActiveTab] = useState<StorefrontTabKey>('products')
  const [catalogRevision, setCatalogRevision] = useState(0)
  const storefront = useStorefront(slug)
  const catalog = useStorefrontProducts(storefront.store?.id, catalogRevision)
  const isProductManagementTab = activeTab === 'add'
  const isCategoryManagementTab = activeTab === 'categories'

  if (storefront.status === 'missing' || storefront.status === 'error') {
    const isMissing = storefront.status === 'missing'

    return (
      <main className="min-h-screen bg-[#f5f5f5]">
        <StorefrontHeader />
        <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0f0] text-[#e30507]">
              {isMissing ? <Store aria-hidden="true" size={26} /> : <AlertCircle aria-hidden="true" size={26} />}
            </span>
            <div>
              <h1 className="text-xl font-bold text-[#111111]">
                {isMissing ? 'Nenhuma loja selecionada' : 'Loja não encontrada'}
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#6b7280]">
                {isMissing
                  ? 'Entre com sua conta de lojista para acessar a loja vinculada ao seu perfil.'
                  : 'Não foi possível carregar esta loja. Confira o endereço e tente novamente.'}
              </p>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <StorefrontHeader />

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <StoreHeroCard
          canEdit={storefront.canEdit}
          isEditing={storefront.isEditing}
          isLoading={storefront.status === 'loading'}
          isSaving={storefront.isSaving}
          onCancelEditing={storefront.cancelEditing}
          onEdit={storefront.startEditing}
          onSave={storefront.saveStore}
          saveError={storefront.saveError}
          store={storefront.store}
        />
        {storefront.status === 'success' ? (
          <StoreTabs activeTab={activeTab} onTabChange={setActiveTab} />
        ) : null}

        {storefront.status !== 'success' ? null : isProductManagementTab ? (
          <ProductManagementPage
            onProductsChanged={() => setCatalogRevision((currentRevision) => currentRevision + 1)}
            storeId={storefront.store?.id}
          />
        ) : isCategoryManagementTab ? (
          <CategoryManagementPage
            onCategoriesChanged={() =>
              setCatalogRevision((currentRevision) => currentRevision + 1)
            }
            storeId={storefront.store?.id}
          />
        ) : (
          <>
            <CategoryChips categories={catalog.categories} />
            <EmptyProductsArea
              products={catalog.products.filter((product) => product.available)}
              status={catalog.status}
            />
          </>
        )}
      </section>
    </main>
  )
}
