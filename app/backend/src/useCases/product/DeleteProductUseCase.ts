import { IProductRepository } from '../../repositories/IProductRepository';

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string, tenantId: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product || product.tenantId !== tenantId) {
      throw new Error('Not Found: Product not found or unauthorized');
    }

    await this.productRepository.softDelete(id);
  }
}
