import { useState, useMemo, useEffect } from "react";
import { loadCartStores, saveCartStores, clearCartStorage } from "../services/cartService";
import type { StoreCart, CartStats, ActiveStoreStats, DeleteConfirmState } from "../types/cart";

interface UseCartCallbacks {
  addToast: (type: "success" | "error" | "info", title: string, message: string) => void;
}

export function useCart({ addToast: _addToast }: UseCartCallbacks) {
  const [stores, setStores] = useState<StoreCart[]>(loadCartStores);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [deleteConfirmState, setDeleteConfirmState] = useState<DeleteConfirmState | null>(null);

  // Sincroniza stores com localStorage a cada mudança
  useEffect(() => {
    saveCartStores(stores);
  }, [stores]);

  const activeStore = useMemo(() => {
    return stores.find((s) => s.id === selectedStoreId) || null;
  }, [stores, selectedStoreId]);

  const globalStats = useMemo<CartStats>(() => {
    let storeCount = 0;
    let totalItemsCount = 0;
    let totalValue = 0;

    stores.forEach((store) => {
      const itemsInStore = store.items.reduce((sum, item) => sum + item.quantity, 0);
      if (itemsInStore > 0) {
        storeCount++;
        totalItemsCount += itemsInStore;
        const storeSubtotal = store.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalValue += storeSubtotal;
      }
    });

    return { storeCount, totalItemsCount, totalValue };
  }, [stores]);

  const activeStoreStats = useMemo<ActiveStoreStats>(() => {
    if (!activeStore) return { subtotal: 0, total: 0 };

    const subtotal = activeStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal;

    return {
      subtotal,
      total
    };
  }, [activeStore]);

  const handleResetCart = () => {
    setStores(clearCartStorage());
    setSelectedStoreId(null);
    setDeleteConfirmState(null);
  };

  const confirmRemoveItem = (storeId: string, itemId: string) => {

    setStores((prevStores) => {
      return prevStores.map((store) => {
        if (store.id !== storeId) return store;
        return {
          ...store,
          items: store.items.filter((item) => item.id !== itemId)
        };
      });
    });

    // Item removed from state
  };

  const handleUpdateQuantity = (storeId: string, itemId: string, change: number) => {
    const storeObj = stores.find((s) => s.id === storeId);
    const itemObj = storeObj?.items.find((i) => i.id === itemId);

    if (change === -1 && itemObj && itemObj.quantity === 1) {
      setDeleteConfirmState({
        isOpen: true,
        storeId,
        itemId,
        itemName: itemObj.name
      });
      return;
    }

    setStores((prevStores) => {
      return prevStores.map((store) => {
        if (store.id !== storeId) return store;

        const updatedItems = store.items
          .map((item) => {
            if (item.id !== itemId) return item;
            const newQty = item.quantity + change;
            return { ...item, quantity: Math.max(0, newQty) };
          })
          .filter((item) => item.quantity > 0);

        return { ...store, items: updatedItems };
      });
    });

    // Quantity updated in state
  };

  const handleRemoveItem = (storeId: string, itemId: string) => {
    const storeObj = stores.find((s) => s.id === storeId);
    const itemObj = storeObj?.items.find((i) => i.id === itemId);

    if (itemObj) {
      setDeleteConfirmState({
        isOpen: true,
        storeId,
        itemId,
        itemName: itemObj.name
      });
    }
  };

  const clearStoreItems = (storeId: string) => {
    setStores((prevStores) =>
      prevStores.map((store) => {
        if (store.id === storeId) {
          return { ...store, items: [] };
        }
        return store;
      })
    );
  };

  return {
    stores,
    selectedStoreId,
    setSelectedStoreId,
    activeStore,
    globalStats,
    activeStoreStats,
    deleteConfirmState,
    setDeleteConfirmState,
    handleUpdateQuantity,
    handleRemoveItem,
    confirmRemoveItem,
    handleResetCart,
    clearStoreItems,
  };
}
