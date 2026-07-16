import type { StoreCart } from "../types/cart";

const CART_STORAGE_KEY = "pedeaqui:cart:stores";

const INITIAL_STORES: StoreCart[] = [];

/**
 * Carrega as lojas do localStorage.
 * Se não houver dados salvos, retorna INITIAL_STORES como seed.
 */
export function loadCartStores(): StoreCart[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Dados corrompidos — limpa e usa fallback
    localStorage.removeItem(CART_STORAGE_KEY);
  }
  return JSON.parse(JSON.stringify(INITIAL_STORES));
}

/**
 * Persiste o estado atual das lojas no localStorage.
 */
export function saveCartStores(stores: StoreCart[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(stores));
  } catch {
    // Storage cheio ou indisponível — falha silenciosa
  }
}

/**
 * Remove os dados do carrinho do localStorage e retorna o seed inicial.
 */
export function clearCartStorage(): StoreCart[] {
  localStorage.removeItem(CART_STORAGE_KEY);
  return JSON.parse(JSON.stringify(INITIAL_STORES));
}
