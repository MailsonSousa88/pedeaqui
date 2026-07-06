import { AddProductCard } from '../components/AddProductCard'
import { AddProductModal } from '../components/AddProductModal'
import { useProductManagement } from '../hooks/useProductManagement'

export function ProductManagementPage() {
  const {
    activeImageSlot,
    closeAddProductModal,
    goToNextImageSlot,
    goToPreviousImageSlot,
    isAddProductModalOpen,
    isFeatured,
    isPromotionEnabled,
    openAddProductModal,
    setStockMode,
    stockMode,
    toggleFeatured,
    togglePromotion,
  } = useProductManagement()

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

      <AddProductCard onClick={openAddProductModal} />

      <AddProductModal
        activeImageSlot={activeImageSlot}
        isFeatured={isFeatured}
        isOpen={isAddProductModalOpen}
        isPromotionEnabled={isPromotionEnabled}
        onClose={closeAddProductModal}
        onNextImage={goToNextImageSlot}
        onPreviousImage={goToPreviousImageSlot}
        onStockModeChange={setStockMode}
        onToggleFeatured={toggleFeatured}
        onTogglePromotion={togglePromotion}
        stockMode={stockMode}
      />
    </section>
  )
}
