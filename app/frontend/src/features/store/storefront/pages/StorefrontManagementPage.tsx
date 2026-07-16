import { useMemo, useState } from 'react'
import { LockKeyhole } from 'lucide-react'

import { CategoryManagementPage } from '../../category-management/pages/CategoryManagementPage'
import { ProductManagementPage } from '../../product-management/pages/ProductManagementPage'
import { EmptyProductsArea } from '../components/EmptyProductsArea'
import { StorefrontFeedback } from '../components/StorefrontFeedback'
import { StoreManagementHeroCard } from '../components/StoreManagementHeroCard'
import { StoreTabs } from '../components/StoreTabs'
import { useStorefrontManagement } from '../hooks/useStorefrontManagement'
import { useStorefrontProducts } from '../hooks/useStorefrontProducts'
import type { StorefrontTabKey } from '../types/storefront'
import { paginateStorefrontProducts } from '../utils/catalog'

type StorefrontManagementPageProps = {
  onBackToPublic: () => void
  onLogin: () => void
  onOpenCart: () => void
  onSelectProduct: (productId: string) => void
  slug?: string
}

export function StorefrontManagementPage({
  onBackToPublic,
  onLogin,
  onOpenCart,
  onSelectProduct,
  slug,
}: StorefrontManagementPageProps) {
  const [activeTab, setActiveTab] = useState<StorefrontTabKey>('products')
  const [catalogRevision, setCatalogRevision] = useState(0)
  const management = useStorefrontManagement(slug)
  const catalog = useStorefrontProducts(management.store?.id, catalogRevision)
  const catalogPage = useMemo(
    () => paginateStorefrontProducts(catalog.products.filter((product) => product.available), 1),
    [catalog.products],
  )

  if (
    management.status === 'missing' ||
    management.status === 'unavailable' ||
    management.status === 'error'
  ) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <StorefrontFeedback
          onBackToStores={onBackToPublic}
          onRetry={management.retry}
          status={management.status}
        />
      </div>
    )
  }

  if (management.status === 'success' && !management.canManage) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center px-4 py-10 sm:px-6">
          <section className="w-full rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#fff0f0] text-[#e30507]">
              <LockKeyhole aria-hidden="true" size={26} />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-[#111111]">Acesso restrito ao proprietário</h1>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-[#6b7280]">
              Entre com a conta responsável por esta loja para acessar as ferramentas de gestão.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                className="min-h-12 rounded-xl bg-[#e30507] px-5 text-sm font-semibold text-white hover:bg-[#b80406] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
                onClick={onLogin}
                type="button"
              >
                Entrar como lojista
              </button>
              <button
                className="min-h-12 rounded-xl border border-gray-300 bg-white px-5 text-sm font-semibold text-[#111111] hover:border-[#e30507] hover:text-[#e30507] focus:outline-none focus:ring-2 focus:ring-[#e30507] focus:ring-offset-2"
                onClick={onBackToPublic}
                type="button"
              >
                Voltar para a vitrine
              </button>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <StoreManagementHeroCard
          canSharePublicLink={management.canSharePublicLink}
          copyLinkStatus={management.copyLinkStatus}
          isEditing={management.isEditing}
          isLoading={management.status === 'loading'}
          isSaving={management.isSaving}
          onCancelEditing={management.cancelEditing}
          onEdit={management.startEditing}
          onSave={management.saveStore}
          onSharePublicLink={management.sharePublicLink}
          saveError={management.saveError}
          store={management.store}
        />

        {management.status === 'success' && management.canManage ? (
          <>
            <StoreTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === 'add' ? (
              <ProductManagementPage
                onProductsChanged={() => setCatalogRevision((revision) => revision + 1)}
                storeId={management.store?.id}
              />
            ) : activeTab === 'categories' ? (
              <CategoryManagementPage
                onCategoriesChanged={() => setCatalogRevision((revision) => revision + 1)}
                storeId={management.store?.id}
              />
            ) : (
              <EmptyProductsArea
                catalogHadProducts={catalog.products.some((product) => product.available)}
                onPageChange={() => undefined}
                onRetry={catalog.retry}
                onSelectProduct={onSelectProduct}
                page={catalogPage}
                status={catalog.status}
              />
            )}
          </>
        ) : null}
      </main>
    </div>
  )
}
