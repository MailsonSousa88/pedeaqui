import { IProductRepository } from '../../repositories/IProductRepository';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { IStoreRepository } from '../../repositories/IStoreRepository';
import { Product } from '../../models/Product';
import { ICreateProductDTO } from '../../dtos/ProductDTOs';
import * as crypto from 'crypto';

export class CreateProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private categoryRepository: ICategoryRepository,
    private storeRepository: IStoreRepository
  ) {}

  async execute(data: ICreateProductDTO): Promise<Product> {
    // 1. Validações hierárquicas
    const store = await this.storeRepository.findById(data.storeId);
    if (!store || store.tenantId !== data.tenantId) {
      throw new Error('Forbidden: Unauthorized to create products for this store');
    }

    const category = await this.categoryRepository.findById(data.categoryId);
    if (!category || category.storeId !== data.storeId || category.deletedAt !== null) {
      throw new Error('Conflict: Category does not exist, belongs to another store, or is deleted');
    }

    // A modelagem já checará (promo < base) no construtor
    const newProduct = new Product({
      id: crypto.randomUUID(),
      tenantId: data.tenantId,
      storeId: data.storeId,
      categoryId: data.categoryId,
      name: data.name,
      description: data.description || null,
      priceCents: data.priceCents,
      promoPriceCents: data.promoPriceCents || null,
      promoEndsAt: data.promoEndsAt ? new Date(data.promoEndsAt) : null,
      details: data.details || {},
      available: data.available !== undefined ? data.available : true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return this.productRepository.create(newProduct);
  }
}
