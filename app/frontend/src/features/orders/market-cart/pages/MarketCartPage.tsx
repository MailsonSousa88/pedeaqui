import { useState } from "react";
import {
  ShoppingBag,
  Store,
  RotateCcw,
} from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import { StoreCard } from "../components/StoreCard";
import { CartSummaryPanel } from "../components/CartSummaryPanel";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { CheckoutForm } from "../components/CheckoutForm";
import { OrderSuccessCard } from "../components/OrderSuccessCard";
import type { CompletedOrder } from "../types/cart";

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
    <div
      className={`w-full bg-[#f8f9fa] flex flex-col font-sans relative min-h-screen ${
        (isFillingCheckoutForm && cart.activeStore) || completedOrder ? "" : "pb-24 md:pb-0"
      }`}
    >
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
                    Adicione produtos para ver as lojas listadas aqui.
                  </p>
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
    </div>
  );
}
