import type { StoreCart } from "../types/cart";

const CART_STORAGE_KEY = "pedeaqui:cart:stores";

const INITIAL_STORES: StoreCart[] = [
  {
    id: "bella-italia",
    name: "Pizzaria Bella Italia",
    logo: "🍕",
    category: "Italiana & Pizzas",
    rating: "4.8",
    deliveryTime: "30-40 min",
    deliveryFee: 6.90,
    isOpen: true,
    color: "border-red-100 hover:border-red-200 bg-red-50/10",
    items: [
      {
        id: "pizza-calabresa",
        name: "Pizza Calabresa Especial (Média)",
        price: 45.90,
        quantity: 1,
        image: "🍕",
        category: "Pizzas"
      },
      {
        id: "coca-2l",
        name: "Refrigerante Coca-Cola 2L",
        price: 11.50,
        quantity: 2,
        image: "🥤",
        category: "Bebidas"
      },
      {
        id: "pudim",
        name: "Pudim de Leite Condensado",
        price: 14.00,
        quantity: 1,
        image: "🍮",
        category: "Sobremesas"
      }
    ]
  },
  {
    id: "craft-burguer",
    name: "Hamburgueria Craft Burguer",
    logo: "🍔",
    category: "Hambúrgueres & Grelhados",
    rating: "4.9",
    deliveryTime: "20-35 min",
    deliveryFee: 4.90,
    isOpen: true,
    color: "border-amber-100 hover:border-amber-200 bg-amber-50/10",
    items: [
      {
        id: "monster-smash",
        name: "Monster Smash Cheddar Duplo",
        price: 38.00,
        quantity: 2,
        image: "🍔",
        category: "Hambúrgueres"
      },
      {
        id: "batata-frita",
        name: "Batata Frita Rústica com Páprica",
        price: 16.00,
        quantity: 1,
        image: "🍟",
        category: "Acompanhamentos"
      },
      {
        id: "milkshake-ninho",
        name: "Milkshake de Ninho com Nutella",
        price: 22.00,
        quantity: 1,
        image: "🥤",
        category: "Bebidas"
      }
    ]
  },
  {
    id: "compre-bem",
    name: "Supermercado Compre Bem",
    logo: "🛒",
    category: "Supermercados & Mercearia",
    rating: "4.5",
    deliveryTime: "45-60 min",
    deliveryFee: 12.90,
    isOpen: true,
    color: "border-blue-100 hover:border-blue-200 bg-blue-50/10",
    items: [
      {
        id: "cafe-lor",
        name: "Café Solúvel L'Or Intense 100g",
        price: 24.90,
        quantity: 1,
        image: "☕",
        category: "Mercearia"
      },
      {
        id: "leite-integral",
        name: "Leite Integral Tipo A 1L",
        price: 5.49,
        quantity: 6,
        image: "🥛",
        category: "Laticínios"
      },
      {
        id: "pao-artesanal",
        name: "Pão de Forma Artesanal Visconti 500g",
        price: 9.80,
        quantity: 2,
        image: "🍞",
        category: "Padaria"
      },
      {
        id: "chocolate-milka",
        name: "Chocolate Milka Oreo Importado 100g",
        price: 12.90,
        quantity: 3,
        image: "🍫",
        category: "Doces"
      }
    ]
  },
  {
    id: "farmacia-vidanova",
    name: "Farmácia Vida Nova",
    logo: "💊",
    category: "Drogarias & Cosméticos",
    rating: "4.7",
    deliveryTime: "15-25 min",
    deliveryFee: 3.50,
    isOpen: true,
    color: "border-emerald-100 hover:border-emerald-200 bg-emerald-50/10",
    items: [
      {
        id: "vitamina-c",
        name: "Vitamina C Redoxon Tripla Ação 30 Comprimidos",
        price: 29.90,
        quantity: 1,
        image: "🍊",
        category: "Suplementos"
      },
      {
        id: "sabonete-liquido",
        name: "Sabonete Líquido Neutrogena Purifying Skin",
        price: 34.50,
        quantity: 1,
        image: "🧴",
        category: "Higiene"
      }
    ]
  }
];

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
