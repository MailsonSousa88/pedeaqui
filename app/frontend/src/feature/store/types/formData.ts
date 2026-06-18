export type StoreContactFormData = {
  storeName: string;
  whatsapp: string;
  email: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  openingHours: string;
};

export type StoreContactFormErrors = Partial<
  Record<keyof StoreContactFormData, string>
>;