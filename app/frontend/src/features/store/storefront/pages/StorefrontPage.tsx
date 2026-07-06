import { useState } from 'react'

import { CategoryManagementPage } from '../../category-management/pages/CategoryManagementPage'
import { ProductManagementPage } from '../../product-management/pages/ProductManagementPage'
import { CategoryChips } from '../components/CategoryChips'
import { EmptyProductsArea } from '../components/EmptyProductsArea'
import { ProductSearchBar } from '../components/ProductSearchBar'
import { StorefrontHeader } from '../components/StorefrontHeader'
import { StoreHeroCard } from '../components/StoreHeroCard'
import { StoreTabs } from '../components/StoreTabs'
import type { StorefrontTabKey } from '../types/storefront'

export function StorefrontPage() {
  const [activeTab, setActiveTab] = useState<StorefrontTabKey>('products')
  const isProductManagementTab = activeTab === 'add'
  const isCategoryManagementTab = activeTab === 'categories'

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <StorefrontHeader />

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <StoreHeroCard />
        <StoreTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {isProductManagementTab ? (
          <ProductManagementPage />
        ) : isCategoryManagementTab ? (
          <CategoryManagementPage />
        ) : (
          <>
            <CategoryChips />
            <ProductSearchBar />
            <EmptyProductsArea />
          </>
        )}
      </section>
    </main>
  )
}
