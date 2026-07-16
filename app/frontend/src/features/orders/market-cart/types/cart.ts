export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface StoreCart {
  id: string;
  name: string;
  logo: string;
  category: string;
  rating: string;
  deliveryTime: string;
  deliveryFee: number;
  items: CartItem[];
  isOpen: boolean;
  color: string;
  phone?: string;
}

export interface CartStats {
  storeCount: number;
  totalItemsCount: number;
  totalValue: number;
}

export interface ActiveStoreStats {
  subtotal: number;
  total: number;
}

export interface DeleteConfirmState {
  isOpen: boolean;
  storeId: string;
  itemId: string;
  itemName: string;
}

export interface CompletedOrder {
  storeName: string;
  storeLogo: string;
  storePhone: string;
  deliveryTime: string;
  total: number;
  items: CartItem[];
  fullName: string;
  paymentMethod: string;
  address: string;
  observation: string;
}
