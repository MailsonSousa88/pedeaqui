export type AdminRole = 'super_admin' | 'support' | 'finance';

export interface IAdminProps {
  id: string;
  name: string;
  role: AdminRole;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Admin {
  public readonly id: string;
  public name: string;
  public role: AdminRole;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: IAdminProps) {
    this.id = props.id;
    this.name = props.name;
    this.role = props.role;
    this.active = props.active;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
