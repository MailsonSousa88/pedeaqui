import { IStoreRepository } from '../../repositories/IStoreRepository';
import { ISubscriptionRepository } from '../../repositories/ISubscriptionRepository';
import { Store } from '../../models/Store';
import { Category } from '../../models/Category';
import { ICreateStoreDTO } from '../../dtos/StoreDTOs';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import * as crypto from 'crypto';

export class CreateStoreUseCase {
  constructor(
    private storeRepository: IStoreRepository,
    private subscriptionRepository: ISubscriptionRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(data: ICreateStoreDTO): Promise<Store> {
    // Busca a assinatura do tenant
    const subscription = await this.subscriptionRepository.findByTenantId(data.tenantId);
    
    // Bloqueia se não houver plano ativo
    if (!subscription || subscription.status !== 'active') {
      throw new Error('Forbidden: No active subscription plan');
    }

    // Regra 1:1 - Verifica se o Tenant já possui uma loja
    const existingTenantStore = await this.storeRepository.findByTenantId(data.tenantId);
    if (existingTenantStore) {
      throw new Error('Conflict: Tenant already has a store');
    }

    // Verifica se o slug já existe
    const existingStoreSlug = await this.storeRepository.findBySlug(data.slug);
    if (existingStoreSlug) {
      throw new Error('Conflict: Store with this slug already exists');
    }

    const newStore = new Store({
      id: crypto.randomUUID(),
      tenantId: data.tenantId,
      slug: data.slug,
      storeName: data.storeName,
      horarioAbertura: data.horarioAbertura || null,
      horarioFechamento: data.horarioFechamento || null,
      endereco: data.endereco,
      city: data.city,
      state: data.state,
      descricao: data.descricao || null,
      logoUrl: data.logoUrl || null,
      whatsappNumber: data.whatsappNumber,
      active: true, // ativa por padrão ao criar
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const createdStore = await this.storeRepository.create(newStore);

    const defaultCategory = new Category({
      id: crypto.randomUUID(),
      tenantId: data.tenantId,
      storeId: createdStore.id,
      name: 'Todos',
      description: null,
      sortOrder: 0,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await this.categoryRepository.create(defaultCategory);

    return createdStore;
  }
}
