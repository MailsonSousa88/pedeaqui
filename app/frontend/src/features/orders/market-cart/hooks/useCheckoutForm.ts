import React, { useState, useEffect } from "react";
import { checkoutSchema } from "../schemas/checkoutSchema";
import type { StoreCart, ActiveStoreStats, CompletedOrder } from "../types/cart";

interface UseCheckoutFormOptions {
  activeStore: StoreCart | null;
  activeStoreStats: ActiveStoreStats;
  onSuccess: (order: CompletedOrder) => void;
  onClearStore: (storeId: string) => void;
  addToast: (type: "success" | "error" | "info", title: string, message: string) => void;
}

export function useCheckoutForm({
  activeStore,
  activeStoreStats,
  onSuccess,
  onClearStore,
  addToast,
}: UseCheckoutFormOptions) {
  const [fullName, setFullName] = useState(() => localStorage.getItem("checkout_fullName") || "");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addressStreet, setAddressStreet] = useState(() => localStorage.getItem("checkout_addressStreet") || "");
  const [addressNumber, setAddressNumber] = useState(() => localStorage.getItem("checkout_addressNumber") || "");
  const [addressNeighborhood, setAddressNeighborhood] = useState(() => localStorage.getItem("checkout_addressNeighborhood") || "");
  const [addressReference, setAddressReference] = useState(() => localStorage.getItem("checkout_addressReference") || "");
  const [addressCity, setAddressCity] = useState(() => localStorage.getItem("checkout_addressCity") || "");
  const [addressState, setAddressState] = useState(() => localStorage.getItem("checkout_addressState") || "");
  const [orderObservation, setOrderObservation] = useState("");
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);

  useEffect(() => {
    localStorage.setItem("checkout_fullName", fullName);
    localStorage.setItem("checkout_addressStreet", addressStreet);
    localStorage.setItem("checkout_addressNumber", addressNumber);
    localStorage.setItem("checkout_addressNeighborhood", addressNeighborhood);
    localStorage.setItem("checkout_addressReference", addressReference);
    localStorage.setItem("checkout_addressCity", addressCity);
    localStorage.setItem("checkout_addressState", addressState);
  }, [fullName, addressStreet, addressNumber, addressNeighborhood, addressReference, addressCity, addressState]);

  function clearError(field: string) {
    setValidationErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }

  function resetForm() {
    setPaymentMethod("");
    setOrderObservation("");
    setValidationErrors({});
  }

  function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!activeStore || activeStore.items.length === 0) return;

    setValidationErrors({});

    const validation = checkoutSchema.safeParse({
      fullName,
      paymentMethod,
      addressStreet,
      addressNumber,
      addressNeighborhood,
      addressReference,
      addressCity,
      addressState,
      orderObservation,
    });

    if (!validation.success) {
      const errors: { [key: string]: string } = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setValidationErrors(errors);
      addToast("error", "Erro de Validação", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsPlacingOrder(true);
    setCheckoutStep(1);

    // Step 1: Enviando seu pedido (1s)
    setTimeout(() => {
      setCheckoutStep(2);
      // Step 2: Confirmando disponibilidade (1.2s)
      setTimeout(() => {
        setCheckoutStep(3);
        // Step 3: Concluindo (1s)
        setTimeout(() => {
          setIsPlacingOrder(false);
          setCheckoutStep(0);

          const storeName = activeStore.name;
          const storeLogo = activeStore.logo;
          const deliveryTime = activeStore.deliveryTime;
          const totalValue = activeStoreStats.total;
          const itemsOrdered = [...activeStore.items];
          const finalAddress = `${addressStreet}, nº ${addressNumber}${addressNeighborhood ? ` - ${addressNeighborhood}` : ""}, ${addressCity}/${addressState.toUpperCase()}${addressReference ? ` (Ref: ${addressReference})` : ""}`;
          const finalObservation = orderObservation;
          const finalFullName = fullName;
          const finalPaymentMethod = paymentMethod;

          onClearStore(activeStore.id);

          onSuccess({
            storeName,
            storeLogo,
            storePhone: activeStore.phone || "",
            deliveryTime,
            total: totalValue,
            items: itemsOrdered,
            fullName: finalFullName,
            paymentMethod: finalPaymentMethod,
            address: finalAddress,
            observation: finalObservation,
          });

          resetForm();
        }, 1000);
      }, 1200);
    }, 1000);
  }

  return {
    fullName, setFullName,
    paymentMethod, setPaymentMethod,
    addressStreet, setAddressStreet,
    addressNumber, setAddressNumber,
    addressNeighborhood, setAddressNeighborhood,
    addressReference, setAddressReference,
    addressCity, setAddressCity,
    addressState, setAddressState,
    orderObservation, setOrderObservation,
    validationErrors,
    isPlacingOrder,
    checkoutStep,
    clearError,
    resetForm,
    handleCheckout,
  };
}
