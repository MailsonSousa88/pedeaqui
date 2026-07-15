import { SupabaseClient } from '@supabase/supabase-js';
import {
  ProductDetail,
  ProductDetailImage,
  ProductDetailOption,
  ProductDetailVariation
} from '../../dtos/ProductDetailDTO';
import { IProductDetailRepository } from '../IProductDetailRepository';
import supabase from '../../infra/supabase/supabaseClient';

type ProductRow = {
  id: string;
  store_id: string;
  category_id: string;
  name: string;
  description: string | null;
  price_cents: number | string;
  promo_price_cents: number | string | null;
  promo_ends_at: string | null;
  details: Record<string, unknown> | null;
  available: boolean;
  created_at: string;
  updated_at: string;
};

type ImageRow = {
  id: string;
  url: string;
  sort_order: number;
};

type VariationRow = {
  id: string;
  product_id: string;
  label: string;
  sort_order: number;
};

type OptionRow = {
  id: string;
  variation_id: string;
  value: string;
  price_modifier_cents: number | string;
  sort_order: number;
};

export class SupabaseProductDetailRepository implements IProductDetailRepository {
  constructor(private readonly client: SupabaseClient = supabase) {}

  async findPublicById(productId: string): Promise<ProductDetail | null> {
    const { data, error } = await this.client
      .from('products')
      .select('id, store_id, category_id, name, description, price_cents, promo_price_cents, promo_ends_at, details, available, created_at, updated_at')
      .eq('id', productId)
      .eq('available', true)
      .is('deleted_at', null)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch public product detail: ${error.message}`);
    }

    return data ? this.buildDetail(data as ProductRow) : null;
  }

  async findByIdForTenant(productId: string, tenantId: string): Promise<ProductDetail | null> {
    const { data, error } = await this.client
      .from('products')
      .select('id, store_id, category_id, name, description, price_cents, promo_price_cents, promo_ends_at, details, available, created_at, updated_at')
      .eq('id', productId)
      .eq('tenant_id', tenantId)
      .is('deleted_at', null)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to fetch merchant product detail: ${error.message}`);
    }

    return data ? this.buildDetail(data as ProductRow) : null;
  }

  private async buildDetail(product: ProductRow): Promise<ProductDetail> {
    const [{ data: imageRows, error: imageError }, { data: variationRows, error: variationError }] = await Promise.all([
      this.client
        .from('product_images')
        .select('id, url, sort_order')
        .eq('product_id', product.id)
        .order('sort_order', { ascending: true })
        .order('id', { ascending: true }),
      this.client
        .from('product_variations')
        .select('id, product_id, label, sort_order')
        .eq('product_id', product.id)
        .order('sort_order', { ascending: true })
        .order('id', { ascending: true })
    ]);

    if (imageError) {
      throw new Error(`Failed to fetch product detail images: ${imageError.message}`);
    }

    if (variationError) {
      throw new Error(`Failed to fetch product detail variations: ${variationError.message}`);
    }

    const variations = (variationRows ?? []) as VariationRow[];
    const variationIds = variations.map((variation) => variation.id);
    const optionsByVariationId = new Map<string, ProductDetailOption[]>();

    if (variationIds.length > 0) {
      const { data: optionRows, error: optionError } = await this.client
        .from('variation_options')
        .select('id, variation_id, value, price_modifier_cents, sort_order')
        .in('variation_id', variationIds)
        .order('sort_order', { ascending: true })
        .order('id', { ascending: true });

      if (optionError) {
        throw new Error(`Failed to fetch product detail options: ${optionError.message}`);
      }

      for (const option of (optionRows ?? []) as OptionRow[]) {
        const options = optionsByVariationId.get(option.variation_id) ?? [];
        options.push({
          id: option.id,
          value: option.value,
          priceModifierCents: Number(option.price_modifier_cents),
          sortOrder: option.sort_order
        });
        optionsByVariationId.set(option.variation_id, options);
      }
    }

    return {
      id: product.id,
      storeId: product.store_id,
      categoryId: product.category_id,
      name: product.name,
      description: product.description,
      priceCents: Number(product.price_cents),
      promoPriceCents: product.promo_price_cents === null ? null : Number(product.promo_price_cents),
      promoEndsAt: product.promo_ends_at ? new Date(product.promo_ends_at) : null,
      details: product.details ?? {},
      available: product.available,
      images: ((imageRows ?? []) as ImageRow[]).map((image): ProductDetailImage => ({
        id: image.id,
        url: image.url,
        sortOrder: image.sort_order
      })),
      variations: variations.map((variation): ProductDetailVariation => ({
        id: variation.id,
        label: variation.label,
        sortOrder: variation.sort_order,
        options: optionsByVariationId.get(variation.id) ?? []
      })),
      createdAt: new Date(product.created_at),
      updatedAt: new Date(product.updated_at)
    };
  }
}
