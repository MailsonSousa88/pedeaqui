import { IPlansRepository, CreatePlanDTO } from '../../repositories/IPlansRepository';
import { Plan } from '../../models/Plan';

export class CreatePlanUseCase {
  constructor(private plansRepository: IPlansRepository) {}

  async execute(data: CreatePlanDTO): Promise<Plan> {
    if (data.priceBrlCents <= 0) {
      throw new Error('Price BRL cents must be greater than 0');
    }

    if (data.stripePriceId) {
      const existingPlan = await this.plansRepository.findByStripeId(data.stripePriceId);
      if (existingPlan) {
        throw new Error('Plan with this stripe_id already exists');
      }
    }

    return this.plansRepository.create(data);
  }
}
