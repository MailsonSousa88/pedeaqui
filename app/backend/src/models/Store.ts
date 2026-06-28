export interface IStoreProps {
  id: string;
  tenantId: string;
  slug: string;
  storeName: string;
  horarioAbertura: string;
  horarioFechamento: string;
  endereco: string;
  descricao: string | null;
  logoUrl: string | null;
  whatsappNumber: string;
  active: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Store {
  public readonly id: string;
  public readonly tenantId: string;
  public slug: string;
  public storeName: string;
  public horarioAbertura: string;
  public horarioFechamento: string;
  public endereco: string;
  public descricao: string | null;
  public logoUrl: string | null;
  public whatsappNumber: string;
  public active: boolean;
  public deletedAt: Date | null;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: IStoreProps) {
    if (!props.slug || props.slug.trim() === '') {
      throw new Error('Store slug is required');
    }
    if (!props.storeName || props.storeName.trim() === '') {
      throw new Error('Store name is required');
    }
    this.id = props.id;
    this.tenantId = props.tenantId;
    this.slug = props.slug;
    this.storeName = props.storeName;
    this.horarioAbertura = props.horarioAbertura;
    this.horarioFechamento = props.horarioFechamento;
    this.endereco = props.endereco;
    this.descricao = props.descricao;
    this.logoUrl = props.logoUrl;
    this.whatsappNumber = props.whatsappNumber;
    this.active = props.active;
    this.deletedAt = props.deletedAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
