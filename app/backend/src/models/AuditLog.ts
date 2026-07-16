export type AuditAction =
  | 'tenant.create'
  | 'tenant.suspend'
  | 'tenant.reactivate'
  | 'tenant.delete'
  | 'tenant.plan_change'
  | 'subscription.create'
  | 'subscription.cancel'
  | 'subscription.past_due'
  | 'plan.create'
  | 'plan.update'
  | 'plan.deactivate'
  | 'admin.create'
  | 'admin.deactivate';

export interface IAuditLogProps {
  id: string;
  adminId: string | null;
  tenantId: string | null;
  action: AuditAction;
  targetTable: string;
  targetId: string;
  payload: Record<string, unknown>;
  createdAt: Date;
}

export class AuditLog {
  public readonly id: string;
  public readonly adminId: string | null;
  public readonly tenantId: string | null;
  public readonly action: AuditAction;
  public readonly targetTable: string;
  public readonly targetId: string;
  public readonly payload: Record<string, unknown>;
  public readonly createdAt: Date;

  constructor(props: IAuditLogProps) {
    this.id = props.id;
    this.adminId = props.adminId;
    this.tenantId = props.tenantId;
    this.action = props.action;
    this.targetTable = props.targetTable;
    this.targetId = props.targetId;
    this.payload = props.payload;
    this.createdAt = props.createdAt;
  }
}
