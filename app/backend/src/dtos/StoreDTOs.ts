export interface ICreateStoreDTO {
  tenantId: string;
  slug: string;
  storeName: string;
  horarioAbertura?: string;
  horarioFechamento?: string;
  endereco: string;
  city: string;
  state: string;
  descricao?: string;
  logoUrl?: string;
  whatsappNumber: string;
}

export interface IUpdateStoreDTO {
  slug?: string;
  storeName?: string;
  horarioAbertura?: string;
  horarioFechamento?: string;
  endereco?: string;
  city?: string;
  state?: string;
  descricao?: string;
  logoUrl?: string;
  whatsappNumber?: string;
}
