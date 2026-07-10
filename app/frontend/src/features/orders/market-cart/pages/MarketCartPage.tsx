import { useState } from "react";
import {
  ShoppingBag,
  Store,
  ShoppingCart,
  LayoutGrid,
  RotateCcw,
  Home,
} from "lucide-react";
// @ts-ignore
import logoPng from "@/assets/pedeaqui_logo.png";
import { useCart } from "../hooks/useCart";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { StoreCard } from "../components/StoreCard";
import { CartSummaryPanel } from "../components/CartSummaryPanel";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { CheckoutForm } from "../components/CheckoutForm";
import { OrderSuccessCard } from "../components/OrderSuccessCard";
import type { CompletedOrder } from "../types/cart";

const Logo = ({ className = "h-8" }: { className?: string }) => {
  return (
    <img
      src={logoPng}
      alt="PedeAqui Logo"
      className={className}
      referrerPolicy="no-referrer"
    />
  );
};

interface MarketCartPageProps {
  addToast: (type: "success" | "error" | "info", title: string, message: string) => void;
}

export function MarketCartPage({ addToast }: MarketCartPageProps) {
  const [isFillingCheckoutForm, setIsFillingCheckoutForm] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  const cart = useCart({ addToast });

  const checkout = useCheckoutForm({
    activeStore: cart.activeStore,
    activeStoreStats: cart.activeStoreStats,
    onSuccess: (order) => {
      setCompletedOrder(order);
      setIsFillingCheckoutForm(false);
      cart.setSelectedStoreId(null);
    },
    onClearStore: (storeId) => {
      cart.clearStoreItems(storeId);
    },
    addToast,
  });

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex flex-col font-sans relative pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 w-full border-b border-gray-100 bg-white z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <Logo className="h-9 sm:h-11 object-contain cursor-pointer" />
          </div>

          {/* Center/Right: Navigation links and Auth buttons */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1.5 font-bold text-sm text-[#8a94a6] hover:text-[#e30507] transition-colors cursor-pointer">
                <Home className="w-4.5 h-4.5 text-[#8a94a6] hover:text-[#e30507]" />
                <span>Início</span>
              </button>
              <button className="flex items-center gap-1.5 font-bold text-sm text-[#8a94a6] hover:text-[#e30507] transition-colors cursor-pointer">
                <Store className="w-4.5 h-4.5 text-[#8a94a6] hover:text-[#e30507]" />
                <span>Lojas</span>
              </button>
              <button className="flex items-center gap-1.5 font-bold text-sm text-[#e30507] transition-colors cursor-pointer">
                <ShoppingCart className="w-4.5 h-4.5 text-[#e30507]" />
                <span>Carrinho</span>
                {cart.globalStats.totalItemsCount > 0 && (
                  <span className="bg-[#e30507] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {cart.globalStats.totalItemsCount}
                  </span>
                )}
              </button>
              <button className="flex items-center gap-1.5 font-bold text-sm text-[#8a94a6] hover:text-[#e30507] transition-colors cursor-pointer">
                <LayoutGrid className="w-4.5 h-4.5 text-[#8a94a6] hover:text-[#e30507]" />
                <span>Vitrine</span>
              </button>
            </div>

            <div className="h-5 w-px bg-gray-200"></div>

            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 bg-[#e30507] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-red-500/10 hover:bg-[#c20406] active:scale-95 transition-all cursor-pointer">
                Entrar
              </button>
              <button className="px-5 py-2.5 bg-[#e30507] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-red-500/10 hover:bg-[#c20406] active:scale-95 transition-all cursor-pointer">
                Começar Agora
              </button>
            </div>
          </nav>

        </div>
      </header>

      {/* Conditional page render */}
      {completedOrder ? (
        /* ==================== 1. ORDER COMPLETED SUMMARY SCREEN ==================== */
        <OrderSuccessCard
          order={completedOrder}
          onBack={() => setCompletedOrder(null)}
        />
      ) : isFillingCheckoutForm && cart.activeStore ? (
        /* ==================== 2. CHECKOUT FORM INPUT SCREEN ==================== */
        <CheckoutForm
          store={cart.activeStore}
          stats={cart.activeStoreStats}
          fullName={checkout.fullName}
          setFullName={checkout.setFullName}
          paymentMethod={checkout.paymentMethod}
          setPaymentMethod={checkout.setPaymentMethod}
          addressStreet={checkout.addressStreet}
          setAddressStreet={checkout.setAddressStreet}
          addressNumber={checkout.addressNumber}
          setAddressNumber={checkout.setAddressNumber}
          addressNeighborhood={checkout.addressNeighborhood}
          setAddressNeighborhood={checkout.setAddressNeighborhood}
          addressReference={checkout.addressReference}
          setAddressReference={checkout.setAddressReference}
          addressCity={checkout.addressCity}
          setAddressCity={checkout.setAddressCity}
          addressState={checkout.addressState}
          setAddressState={checkout.setAddressState}
          orderObservation={checkout.orderObservation}
          setOrderObservation={checkout.setOrderObservation}
          validationErrors={checkout.validationErrors}
          clearError={checkout.clearError}
          isPlacingOrder={checkout.isPlacingOrder}
          checkoutStep={checkout.checkoutStep}
          onBack={() => setIsFillingCheckoutForm(false)}
          onSubmit={checkout.handleCheckout}
        />
      ) : (
        /* ==================== 3. STANDARD CART SELECT & ITEMS VIEW ==================== */
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
          {/* Left Side: Stores Cards List */}
          <div className={`flex-1 transition-all duration-300 ${cart.selectedStoreId ? "hidden lg:block lg:max-w-md" : "w-full"}`}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <Store className="w-6 h-6 text-[#e30507]" />
                  Lojas com itens no carrinho
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Selecione uma loja para ver os produtos, ajustar quantidades e finalizar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {cart.stores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  isSelected={store.id === cart.selectedStoreId}
                  onSelect={cart.setSelectedStoreId}
                />
              ))}

              {cart.globalStats.storeCount === 0 && (
                <div className="col-span-full py-16 px-4 bg-white rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Seu carrinho está vazio</h3>
                  <p className="text-sm text-gray-400 mt-1 max-w-sm">
                    Adicione produtos para ver as lojas listadas aqui. Você pode redefinir o mock de teste a qualquer momento.
                  </p>
                  <button
                    onClick={cart.handleResetCart}
                    className="mt-6 px-5 py-2.5 bg-[#e30507] hover:bg-red-600 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-2 shadow-md shadow-red-500/15"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Restaurar Itens de Teste
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Store Cart Items Detailed View + Checkout Panel */}
          <div className={`flex-1 ${!cart.selectedStoreId ? "hidden lg:block lg:opacity-40 pointer-events-none" : "w-full"}`}>
            <CartSummaryPanel
              store={cart.activeStore!}
              stats={cart.activeStoreStats}
              onBack={() => cart.setSelectedStoreId(null)}
              onUpdateQuantity={cart.handleUpdateQuantity}
              onRemoveItem={cart.handleRemoveItem}
              onCheckout={() => {
                if (!cart.activeStore || cart.activeStore.items.length === 0) return;
                setIsFillingCheckoutForm(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Item Deletion Confirmation Modal */}
      <DeleteConfirmModal
        state={cart.deleteConfirmState}
        onCancel={() => cart.setDeleteConfirmState(null)}
        onConfirm={(storeId, itemId) => {
          cart.confirmRemoveItem(storeId, itemId);
          cart.setDeleteConfirmState(null);
        }}
      />

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] rounded-t-[2rem] z-45 px-6 py-3 pb-safe grid grid-cols-4">
        <button className="flex flex-col items-center justify-center py-1 cursor-pointer">
          <Home className="w-5.5 h-5.5 text-[#8a94a6]" />
          <span className="text-[10px] font-bold text-[#8a94a6] mt-1">Início</span>
        </button>
        <button className="flex flex-col items-center justify-center py-1 cursor-pointer">
          <Store className="w-5.5 h-5.5 text-[#8a94a6]" />
          <span className="text-[10px] font-bold text-[#8a94a6] mt-1">Lojas</span>
        </button>
        <button className="flex flex-col items-center justify-center py-1 cursor-pointer">
          <div className="relative">
            <ShoppingCart className="w-5.5 h-5.5 text-[#e30507]" />
            {cart.globalStats.totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-3 text-[#e30507] text-[10px] font-black leading-none">
                {cart.globalStats.totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black text-[#e30507] mt-1">Carrinho</span>
        </button>
        <button className="flex flex-col items-center justify-center py-1 cursor-pointer">
          <LayoutGrid className="w-5.5 h-5.5 text-[#8a94a6]" />
          <span className="text-[10px] font-bold text-[#8a94a6] mt-1">Vitrine</span>
        </button>
      </div>
    </div>
  );
}
