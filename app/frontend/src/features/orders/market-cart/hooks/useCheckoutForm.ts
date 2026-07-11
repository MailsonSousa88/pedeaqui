import React, { useState } from "react";
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
  const [fullName, setFullName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressNeighborhood, setAddressNeighborhood] = useState("");
  const [addressReference, setAddressReference] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [orderObservation, setOrderObservation] = useState("");
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);

  function clearError(field: string) {
    setValidationErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }

  function resetForm() {
    setFullName("");
    setPaymentMethod("");
    setAddressStreet("");
    setAddressNumber("");
    setAddressNeighborhood("");
    setAddressReference("");
    setAddressCity("");
    setAddressState("");
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
            deliveryTime,
            total: totalValue,
            items: itemsOrdered,
            fullName: finalFullName,
            paymentMethod: finalPaymentMethod,
            address: finalAddress,
            observation: finalObservation,
          });

          resetForm();

          addToast(
            "success",
            "Pedido Confirmado!",
            `Seu pedido no ${storeName} foi enviado e já está sendo preparado!`
          );
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
