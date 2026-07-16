import { useEffect } from 'react'

import { AddProductCard } from '../components/AddProductCard'
import { AddProductModal } from '../components/AddProductModal'
import { ManageProductsCard } from '../components/ManageProductsCard'
import { ManageProductsPanel } from '../components/ManageProductsPanel'
import { ProductDeleteConfirmation } from '../components/ProductDeleteConfirmation'
import { useProductManagement } from '../hooks/useProductManagement'

type ProductManagementPageProps = {
  onProductsChanged?: () => void
  storeId?: string | null
}

export function ProductManagementPage({ onProductsChanged, storeId }: ProductManagementPageProps) {
  const {
    action,
    categories,
    categoryError,
    categoryStatus,
    closeAddProductModal,
    closeManageProductsPanel,
    closeDeleteConfirmation,
    closeEditProductModal,
    confirmDeleteProduct,
    editingProduct,
    emptyProductsMessage,
    filteredProducts,
    filters,
    hasStoreId,
    isAddProductModalOpen,
    isDeleteConfirmationOpen,
    isManageProductsPanelOpen,
    isPromotionEnabled,
    isSavingProduct,
    listError,
    listStatus,
    loadCategories,
    loadProducts,
    openDeleteConfirmation,
    openAddProductModal,
    openEditProductModal,
    openManageProductsPanel,
    createProductCategory,
    handleToggleProductAvailability,
    products,
    resetProductFilters,
    saveEditingProduct,
    saveNewProduct,
    saveProductError,
    selectedProductForDelete,
    setAvailabilityFilter,
    setCategoryFilter,
    setPromotionFilter,
    setSearchTerm,
    togglePromotion,
  } = useProductManagement({ onProductsChanged, storeId })

  useEffect(() => {
    if (isManageProductsPanelOpen) {
      void loadProducts()
    }
  }, [isManageProductsPanelOpen, loadProducts])

  useEffect(() => {
    if (isAddProductModalOpen) {
      void loadCategories()
    }
  }, [isAddProductModalOpen, loadCategories])

  return (
    <section className="flex flex-col gap-4" aria-labelledby="product-management-title">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-[#e30507]">
          Gestão de produtos
        </p>
        <h2 id="product-management-title" className="text-2xl font-black text-[#111111]">
          Produtos da loja
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-[#6b7280]">
          Adicione produtos à sua vitrine e acompanhe os itens persistidos na lista da loja.
        </p>
      </div>

      {isManageProductsPanelOpen ? (
        <ManageProductsPanel
          action={action}
          emptyProductsMessage={emptyProductsMessage}
          filteredProducts={filteredProducts}
          filters={filters}
          hasStoreId={hasStoreId}
          listError={listError}
          listStatus={listStatus}
          onAvailabilityFilterChange={setAvailabilityFilter}
          onBack={closeManageProductsPanel}
          onCategoryFilterChange={setCategoryFilter}
          onEditProduct={openEditProductModal}
          onPromotionFilterChange={setPromotionFilter}
          onRemoveProduct={openDeleteConfirmation}
          onResetFilters={resetProductFilters}
          onRetry={loadProducts}
          onSearchTermChange={setSearchTerm}
          onToggleAvailability={handleToggleProductAvailability}
          products={products}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <AddProductCard onClick={openAddProductModal} />
          <ManageProductsCard onClick={openManageProductsPanel} />
        </div>
      )}

      <AddProductModal
        categories={categories}
        categoryError={categoryError}
        initialProduct={editingProduct}
        isOpen={isAddProductModalOpen}
        isCategoryLoading={categoryStatus === 'loading'}
        isPromotionEnabled={isPromotionEnabled}
        isSaving={isSavingProduct || action.status === 'loading'}
        mode={editingProduct ? 'edit' : 'create'}
        onClose={editingProduct ? closeEditProductModal : closeAddProductModal}
        onCreateCategory={createProductCategory}
        onSave={editingProduct ? saveEditingProduct : saveNewProduct}
        onTogglePromotion={togglePromotion}
        saveError={saveProductError}
      />

      <ProductDeleteConfirmation
        action={action}
        isOpen={isDeleteConfirmationOpen}
        onCancel={closeDeleteConfirmation}
        onConfirm={confirmDeleteProduct}
        product={selectedProductForDelete}
      />
    </section>
  )
}
