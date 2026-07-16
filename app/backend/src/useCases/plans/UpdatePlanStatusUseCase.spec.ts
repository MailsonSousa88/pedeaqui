import { UpdatePlanStatusUseCase } from './UpdatePlanStatusUseCase';
import { IPlansRepository } from '../../repositories/IPlansRepository';
import { Plan } from '../../models/Plan';

describe('UpdatePlanStatusUseCase', () => {
  let updatePlanStatusUseCase: UpdatePlanStatusUseCase;
  let plansRepositoryMock: jest.Mocked<IPlansRepository>;

  beforeEach(() => {
    plansRepositoryMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByStripeId: jest.fn(),
      updateStatus: jest.fn(),
    };

    updatePlanStatusUseCase = new UpdatePlanStatusUseCase(plansRepositoryMock);
  });

  it('should be able to update a plan status', async () => {
    const plan = new Plan({
      id: '123',
      name: 'Plano Pro',
      priceBrlCents: 9900,
      stripePriceId: 'price_123',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    plansRepositoryMock.updateStatus.mockResolvedValue(plan);

    const updatedPlan = await updatePlanStatusUseCase.execute({
      id: '123',
      active: false,
    });

    expect(plansRepositoryMock.updateStatus).toHaveBeenCalledWith('123', false);
    expect(updatedPlan).toEqual(plan);
  });

  it('should not be able to update a non-existing plan', async () => {
    plansRepositoryMock.updateStatus.mockResolvedValue(null);

    await expect(
      updatePlanStatusUseCase.execute({
        id: '123',
        active: false,
      })
    ).rejects.toThrow('Plan not found');

    expect(plansRepositoryMock.updateStatus).toHaveBeenCalledWith('123', false);
  });
});
