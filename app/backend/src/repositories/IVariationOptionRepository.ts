import { VariationOption } from '../models/VariationOption';

export interface IVariationOptionRepository {
  findById(id: string): Promise<VariationOption | null>;
  findByVariationId(variationId: string): Promise<VariationOption[]>;
  create(option: VariationOption): Promise<VariationOption>;
  update(option: VariationOption): Promise<VariationOption>;
  delete(id: string): Promise<void>;
}
