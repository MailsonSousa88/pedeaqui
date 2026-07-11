import { useEffect } from 'react'

import { AddProductCard } from '../components/AddProductCard'
import { AddProductModal } from '../components/AddProductModal'
import { ManageProductsCard } from '../components/ManageProductsCard'
import { ManageProductsPanel } from '../components/ManageProductsPanel'
import { ProductDeleteConfirmation } from '../components/ProductDeleteConfirmation'
import { useProductManagement } from '../hooks/useProductManagement'

export function ProductManagementPage() {
  const {
    action,
    activeImageSlot,
    closeAddProductModal,
    closeManageProductsPanel,
    closeDeleteConfirmation,
    closeEditProductModal,
    confirmDeleteProduct,
    editingProduct,
    emptyProductsMessage,
    filteredProducts,
    filters,
    goToNextImageSlot,
    goToPreviousImageSlot,
    hasStoreId,
    isAddProductModalOpen,
    isDeleteConfirmationOpen,
    isFeatured,
    isManageProductsPanelOpen,
    isPromotionEnabled,
    listError,
    listStatus,
    loadProducts,
    openDeleteConfirmation,
    openAddProductModal,
    openEditProductModal,
    openManageProductsPanel,
    handleToggleProductAvailability,
    products,
    resetProductFilters,
    saveEditingProduct,
    selectedProductForDelete,
    setAvailabilityFilter,
    setCategoryFilter,
    setPromotionFilter,
    setSearchTerm,
    setStockMode,
    stockMode,
    toggleFeatured,
    togglePromotion,
  } = useProductManagement()

  useEffect(() => {
    if (isManageProductsPanelOpen) {
      void loadProducts()
    }
  }, [isManageProductsPanelOpen, loadProducts])

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
          Adicione produtos à sua vitrine. Nesta primeira versão, o cadastro é visual e
          não salva informações reais.
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
        activeImageSlot={activeImageSlot}
        initialProduct={editingProduct}
        isFeatured={isFeatured}
        isOpen={isAddProductModalOpen}
        isPromotionEnabled={isPromotionEnabled}
        mode={editingProduct ? 'edit' : 'create'}
        onClose={editingProduct ? closeEditProductModal : closeAddProductModal}
        onNextImage={goToNextImageSlot}
        onPreviousImage={goToPreviousImageSlot}
        onSave={editingProduct ? saveEditingProduct : closeAddProductModal}
        onStockModeChange={setStockMode}
        onToggleFeatured={toggleFeatured}
        onTogglePromotion={togglePromotion}
        stockMode={stockMode}
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
