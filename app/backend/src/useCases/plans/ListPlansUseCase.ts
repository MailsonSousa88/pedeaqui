import { Plan } from '../../models/Plan';
import { IPlansRepository } from '../../repositories/IPlansRepository';

export interface ListPlansRequestDTO {
  active?: boolean;
}

export class ListPlansUseCase {
  constructor(private plansRepository: IPlansRepository) {}

  async execute(filters?: ListPlansRequestDTO): Promise<Plan[]> {
    const plans = await this.plansRepository.findAll(filters);
    return plans;
  }
}
