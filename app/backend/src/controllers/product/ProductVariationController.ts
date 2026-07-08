import { Request, Response } from 'express';
import { SupabaseProductRepository } from '../../repositories/supabase/SupabaseProductRepository';
import { SupabaseProductVariationRepository } from '../../repositories/supabase/SupabaseProductVariationRepository';
import { SupabaseVariationOptionRepository } from '../../repositories/supabase/SupabaseVariationOptionRepository';
import { CreateProductVariationUseCase } from '../../useCases/product/CreateProductVariationUseCase';
import { ListProductVariationsUseCase } from '../../useCases/product/ListProductVariationsUseCase';
import { UpdateProductVariationUseCase } from '../../useCases/product/UpdateProductVariationUseCase';
import { DeleteProductVariationUseCase } from '../../useCases/product/DeleteProductVariationUseCase';
import { CreateVariationOptionUseCase } from '../../useCases/product/CreateVariationOptionUseCase';
import { ListVariationOptionsUseCase } from '../../useCases/product/ListVariationOptionsUseCase';
import { UpdateVariationOptionUseCase } from '../../useCases/product/UpdateVariationOptionUseCase';
import { DeleteVariationOptionUseCase } from '../../useCases/product/DeleteVariationOptionUseCase';

export class ProductVariationController {
  private productRepository = new SupabaseProductRepository();
  private variationRepository = new SupabaseProductVariationRepository();
  private optionRepository = new SupabaseVariationOptionRepository();

  private createVariationUseCase = new CreateProductVariationUseCase(this.productRepository, this.variationRepository);
  private listVariationsUseCase = new ListProductVariationsUseCase(this.productRepository, this.variationRepository);
  private updateVariationUseCase = new UpdateProductVariationUseCase(this.productRepository, this.variationRepository);
  private deleteVariationUseCase = new DeleteProductVariationUseCase(this.productRepository, this.variationRepository);
  private createOptionUseCase = new CreateVariationOptionUseCase(this.productRepository, this.variationRepository, this.optionRepository);
  private listOptionsUseCase = new ListVariationOptionsUseCase(this.productRepository, this.variationRepository, this.optionRepository);
  private updateOptionUseCase = new UpdateVariationOptionUseCase(this.productRepository, this.variationRepository, this.optionRepository);
  private deleteOptionUseCase = new DeleteVariationOptionUseCase(this.productRepository, this.variationRepository, this.optionRepository);

  createVariation = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const { productId } = req.params;
      const variation = await this.createVariationUseCase.execute({ ...req.body, tenantId, productId: productId as string });

      return res.status(201).json(variation);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  listVariations = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const { productId } = req.params;
      const variations = await this.listVariationsUseCase.execute(productId as string, tenantId);

      return res.status(200).json(variations);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  updateVariation = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const { productId, variationId } = req.params;
      const variation = await this.updateVariationUseCase.execute({
        ...req.body,
        tenantId,
        productId: productId as string,
        variationId: variationId as string,
      });

      return res.status(200).json(variation);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  deleteVariation = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const { productId, variationId } = req.params;
      await this.deleteVariationUseCase.execute(productId as string, variationId as string, tenantId);

      return res.status(204).send();
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  createOption = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const { productId, variationId } = req.params;
      const option = await this.createOptionUseCase.execute({
        ...req.body,
        tenantId,
        productId: productId as string,
        variationId: variationId as string,
      });

      return res.status(201).json(option);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  listOptions = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const { productId, variationId } = req.params;
      const options = await this.listOptionsUseCase.execute(productId as string, variationId as string, tenantId);

      return res.status(200).json(options);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  updateOption = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const { productId, variationId, optionId } = req.params;
      const option = await this.updateOptionUseCase.execute({
        ...req.body,
        tenantId,
        productId: productId as string,
        variationId: variationId as string,
        optionId: optionId as string,
      });

      return res.status(200).json(option);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  deleteOption = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tenantId = req.user!.id;
      const { productId, variationId, optionId } = req.params;
      await this.deleteOptionUseCase.execute(productId as string, variationId as string, optionId as string, tenantId);

      return res.status(204).send();
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: any): Response {
    if (error.message.includes('Not Found')) return res.status(404).json({ error: error.message });
    if (error.message.includes('Forbidden')) return res.status(403).json({ error: error.message });
    if (error.message.includes('Conflict')) return res.status(409).json({ error: error.message });
    return res.status(400).json({ error: error.message });
  }
}
