import { IProductRepository } from '../../repositories/IProductRepository';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { Product } from '../../models/Product';
import { IUpdateProductDTO } from '../../dtos/ProductDTOs';

export class UpdateProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(id: string, tenantId: string, data: IUpdateProductDTO): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product || product.tenantId !== tenantId) {
      throw new Error('Not Found: Product not found or unauthorized');
    }

    // Se houver tentativa de mudar de categoria, checar se a nova cat. pertence a mesma loja
    if (data.categoryId && data.categoryId !== product.categoryId) {
      const category = await this.categoryRepository.findById(data.categoryId);
      if (!category || category.storeId !== product.storeId || category.deletedAt !== null) {
        throw new Error('Conflict: Cannot move product to an invalid or deleted category');
      }
      product.categoryId = data.categoryId;
    }

    if (data.name !== undefined) product.name = data.name;
    if (data.description !== undefined) product.description = data.description || null;
    
    // Como a validação (promo < base) está no Model, precisamos setar todos os valores para acionar o erro caso inválido? 
    // O JS não dispara setter com validação automaticamente (pois as props não são getters/setters puros no model simples que temos).
    // Faremos a validação in-loco (redundância saudável) antes de salvar, ou deixamos a Model pura engolir e apenas verificamos.
    // Vamos proteger no UseCase.
    
    const newPriceCents = data.priceCents !== undefined ? data.priceCents : product.priceCents;
    const newPromoPriceCents = data.promoPriceCents !== undefined ? data.promoPriceCents : product.promoPriceCents;
    const newPromoEndsAt = data.promoEndsAt !== undefined ? (data.promoEndsAt ? new Date(data.promoEndsAt) : null) : product.promoEndsAt;

    if (newPriceCents <= 0) throw new Error('Price cents must be greater than 0');
    if (newPromoPriceCents !== null) {
      if (newPromoPriceCents <= 0) throw new Error('Promo price cents must be greater than 0');
      if (newPromoPriceCents >= newPriceCents) throw new Error('Promo price cents must be less than base price cents');
    }
    if (newPromoEndsAt !== null && newPromoPriceCents === null) {
      throw new Error('Promo ends at requires promo price cents to be defined');
    }

    product.priceCents = newPriceCents;
    product.promoPriceCents = newPromoPriceCents;
    product.promoEndsAt = newPromoEndsAt;

    if (data.details !== undefined) product.details = data.details;

    product.updatedAt = new Date();

    return this.productRepository.update(product);
  }
}
