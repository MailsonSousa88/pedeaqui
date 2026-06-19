// feature/store/hooks/useStoreSetupForm.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  storeSetupSchema,
  type StoreSetupFormData,
} from "../schemas/storeSetupSchema";

export function useStoreSetupForm() {
  return useForm<StoreSetupFormData>({
    resolver: zodResolver(storeSetupSchema),
    mode: "onSubmit",
    defaultValues: {
      state: "",
      city: "",
      district: "",
      street: "",
      number: "",
      storeName: "",
      whatsapp: "",
      email: "",
      startDay: "",
      endDay: "",
      openAt: "",
      closeAt: "",
    },
  });
}
