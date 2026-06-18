import { useState } from "react";
import type { StoreContactFormData } from "../types/formData";
import type { StoreContactFormErrors } from "../types/formData";

const STORAGE_KEY = 'storeContactForm'

const defaultFormData: StoreContactFormData = {
  storeName: "",
  whatsapp: "",
  email: "",
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  openingHours: "",
};

function loadInitialFormData(): StoreContactFormData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultFormData
    const parsed = JSON.parse(raw)
    return { ...defaultFormData, ...parsed }
  } catch (err) {
    return defaultFormData
  }
}

export function useStoreContactForm() {
  const [formData, setFormData] = useState<StoreContactFormData>(() => loadInitialFormData());
  const [errors, setErrors] = useState<StoreContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof StoreContactFormData, value: string) {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [field]: undefined,
    }));

    setSubmitted(false);
  }

  function validateForm() {
    const newErrors: StoreContactFormErrors = {};
    const whatsappNumbers = formData.whatsapp.replace(/\D/g, "");

    if (!formData.storeName.trim()) {
      newErrors.storeName = "O nome da loja é obrigatório.";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "O WhatsApp da loja é obrigatório.";
    } else if (whatsappNumbers.length < 10) {
      newErrors.whatsapp = "Informe um WhatsApp válido.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "O e-mail de contato é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Informe um e-mail válido.";
    }

    if (!formData.street.trim()) {
      newErrors.street = "A rua é obrigatória.";
    }

    if (!formData.number.trim()) {
      newErrors.number = "O número é obrigatório.";
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = "O bairro é obrigatório.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "A cidade é obrigatória.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "O estado é obrigatório.";
    }

    if (!formData.openingHours.trim()) {
      newErrors.openingHours = "O horário de funcionamento é obrigatório.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function submitForm() {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setSubmitted(true);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    } catch (err) {
      // ignore
    }

    console.log("Dados válidos da loja:", formData);
  }

  return {
    formData,
    errors,
    submitted,
    handleChange,
    submitForm,
  };
}