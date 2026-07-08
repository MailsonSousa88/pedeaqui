import { Plan, IPlanProps } from '../models/Plan';

export type CreatePlanDTO = Omit<IPlanProps, 'id' | 'createdAt' | 'updatedAt'>;

export interface IPlansRepository {
  create(plan: CreatePlanDTO): Promise<Plan>;
  findAll(filters?: { active?: boolean }): Promise<Plan[]>;
  findByStripeId(stripeId: string): Promise<Plan | null>;
  updateStatus(id: string, active: boolean): Promise<Plan | null>;
}
