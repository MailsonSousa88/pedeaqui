import { Plan } from '../../models/Plan';
import { IPlansRepository } from '../../repositories/IPlansRepository';

export interface IUpdatePlanStatusRequestDTO {
  id: string;
  active: boolean;
}

export class UpdatePlanStatusUseCase {
  constructor(private plansRepository: IPlansRepository) {}

  async execute({ id, active }: IUpdatePlanStatusRequestDTO): Promise<Plan> {
    const plan = await this.plansRepository.updateStatus(id, active);

    if (!plan) {
      throw new Error('Plan not found');
    }

    return plan;
  }
}
