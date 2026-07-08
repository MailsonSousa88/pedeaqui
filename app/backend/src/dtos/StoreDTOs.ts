export interface ICreateStoreDTO {
  tenantId: string;
  slug: string;
  storeName: string;
  horarioAbertura?: string;
  horarioFechamento?: string;
  endereco: string;
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
  descricao?: string;
  logoUrl?: string;
  whatsappNumber?: string;
}
