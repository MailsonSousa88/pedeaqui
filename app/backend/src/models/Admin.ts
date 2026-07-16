export type AdminRole = 'super_admin' | 'support' | 'finance';

export interface IAdminProps {
  id: string;
  role: AdminRole;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Admin {
  public readonly id: string;
  public role: AdminRole;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: IAdminProps) {
    this.id = props.id;
    this.role = props.role;
    this.active = props.active;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
