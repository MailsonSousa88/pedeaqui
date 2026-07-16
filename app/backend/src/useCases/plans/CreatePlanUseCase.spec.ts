import { CreatePlanUseCase } from './CreatePlanUseCase';
import { IPlansRepository, CreatePlanDTO } from '../../repositories/IPlansRepository';
import { Plan } from '../../models/Plan';

const mockPlansRepository = (): IPlansRepository => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByStripeId: jest.fn(),
  updateStatus: jest.fn(),
});

describe('CreatePlanUseCase', () => {
  let createPlanUseCase: CreatePlanUseCase;
  let plansRepository: IPlansRepository;

  beforeEach(() => {
    plansRepository = mockPlansRepository();
    createPlanUseCase = new CreatePlanUseCase(plansRepository);
  });

  it('should create a plan successfully', async () => {
    const planData: CreatePlanDTO = {
      name: 'Premium',
      priceBrlCents: 1000,
      stripePriceId: 'price_123',
      active: true,
    };

    const createdPlan = new Plan({
      id: 'plan_1',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...planData
    });

    (plansRepository.findByStripeId as jest.Mock).mockResolvedValue(null);
    (plansRepository.create as jest.Mock).mockResolvedValue(createdPlan);

    const result = await createPlanUseCase.execute(planData);

    expect(result).toBe(createdPlan);
    expect(plansRepository.findByStripeId).toHaveBeenCalledWith('price_123');
    expect(plansRepository.create).toHaveBeenCalledWith(planData);
  });

  it('should throw an error if price is 0 or less', async () => {
    const planData: CreatePlanDTO = {
      name: 'Free',
      priceBrlCents: 0,
      stripePriceId: 'price_free',
      active: true,
    };

    await expect(createPlanUseCase.execute(planData)).rejects.toThrow('Price BRL cents must be greater than 0');
    expect(plansRepository.findByStripeId).not.toHaveBeenCalled();
    expect(plansRepository.create).not.toHaveBeenCalled();
  });

  it('should throw an error if stripe_id already exists', async () => {
    const planData: CreatePlanDTO = {
      name: 'Premium',
      priceBrlCents: 1000,
      stripePriceId: 'price_123',
      active: true,
    };

    const existingPlan = new Plan({
      id: 'plan_1',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...planData
    });

    (plansRepository.findByStripeId as jest.Mock).mockResolvedValue(existingPlan);

    await expect(createPlanUseCase.execute(planData)).rejects.toThrow('Plan with this stripe_id already exists');
    expect(plansRepository.findByStripeId).toHaveBeenCalledWith('price_123');
    expect(plansRepository.create).not.toHaveBeenCalled();
  });
  
  it('should create a plan without stripePriceId successfully', async () => {
    const planData: CreatePlanDTO = {
      name: 'Internal Plan',
      priceBrlCents: 5000,
      stripePriceId: null,
      active: true,
    };

    const createdPlan = new Plan({
      id: 'plan_2',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...planData
    });

    (plansRepository.create as jest.Mock).mockResolvedValue(createdPlan);

    const result = await createPlanUseCase.execute(planData);

    expect(result).toBe(createdPlan);
    expect(plansRepository.findByStripeId).not.toHaveBeenCalled();
    expect(plansRepository.create).toHaveBeenCalledWith(planData);
  });
});
