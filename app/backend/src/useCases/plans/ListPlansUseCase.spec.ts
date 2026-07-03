import { ListPlansUseCase } from './ListPlansUseCase';
import { IPlansRepository } from '../../repositories/IPlansRepository';
import { Plan } from '../../models/Plan';

const mockPlansRepository = (): jest.Mocked<IPlansRepository> => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByStripeId: jest.fn(),
  updateStatus: jest.fn(),
});

describe('ListPlansUseCase', () => {
  let listPlansUseCase: ListPlansUseCase;
  let plansRepository: jest.Mocked<IPlansRepository>;

  beforeEach(() => {
    plansRepository = mockPlansRepository();
    listPlansUseCase = new ListPlansUseCase(plansRepository);
  });

  it('should list all plans when no filters are provided', async () => {
    const mockPlans = [
      new Plan({
        id: '1',
        name: 'Basic',
        priceBrlCents: 1000,
        stripePriceId: 'price_123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      new Plan({
        id: '2',
        name: 'Pro',
        priceBrlCents: 2000,
        stripePriceId: 'price_456',
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    plansRepository.findAll.mockResolvedValue(mockPlans);

    const result = await listPlansUseCase.execute();

    expect(plansRepository.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toEqual(mockPlans);
    expect(result.length).toBe(2);
  });

  it('should list only active plans when active filter is true', async () => {
    const mockPlans = [
      new Plan({
        id: '1',
        name: 'Basic',
        priceBrlCents: 1000,
        stripePriceId: 'price_123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ];

    plansRepository.findAll.mockResolvedValue(mockPlans);

    const result = await listPlansUseCase.execute({ active: true });

    expect(plansRepository.findAll).toHaveBeenCalledWith({ active: true });
    expect(result).toEqual(mockPlans);
    expect(result.length).toBe(1);
    expect(result[0].active).toBe(true);
  });
  
  it('should list only inactive plans when active filter is false', async () => {
    const mockPlans = [
      new Plan({
        id: '2',
        name: 'Pro',
        priceBrlCents: 2000,
        stripePriceId: 'price_456',
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ];

    plansRepository.findAll.mockResolvedValue(mockPlans);

    const result = await listPlansUseCase.execute({ active: false });

    expect(plansRepository.findAll).toHaveBeenCalledWith({ active: false });
    expect(result).toEqual(mockPlans);
    expect(result.length).toBe(1);
    expect(result[0].active).toBe(false);
  });
});
