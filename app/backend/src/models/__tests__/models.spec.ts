import { Admin, AuditLog, Plan, Tenant, Subscription, Store, Category, Product, ProductImage, ProductVariation, VariationOption } from '../index';

describe('Domain Entities', () => {
  describe('Admin Entity', () => {
    it('should create an Admin instance correctly', () => {
      const adminProps = {
        id: 'uuid-admin',
        name: 'John Doe',
        role: 'super_admin' as const,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const admin = new Admin(adminProps);
      expect(admin.id).toBe(adminProps.id);
      expect(admin.name).toBe(adminProps.name);
      expect(admin.role).toBe(adminProps.role);
    });
  });

  describe('AuditLog Entity', () => {
    it('should create an AuditLog instance correctly', () => {
      const auditProps = {
        id: 'uuid-log',
        adminId: 'uuid-admin',
        action: 'tenant.create' as const,
        targetTable: 'tenants',
        targetId: 'uuid-tenant',
        payload: { name: 'Tenant A' },
        createdAt: new Date()
      };
      const log = new AuditLog(auditProps);
      expect(log.action).toBe(auditProps.action);
      expect(log.payload).toEqual(auditProps.payload);
    });
  });

  describe('Plan Entity', () => {
    it('should create a Plan instance correctly', () => {
      const planProps = {
        id: 'uuid-plan',
        name: 'Premium Plan',
        priceBrlCents: 9990,
        stripePriceId: 'price_123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const plan = new Plan(planProps);
      expect(plan.priceBrlCents).toBe(9990);
    });

    it('should throw an error if price is less than or equal to 0', () => {
      const planProps = {
        id: 'uuid-plan',
        name: 'Premium Plan',
        priceBrlCents: 0,
        stripePriceId: 'price_123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      expect(() => new Plan(planProps)).toThrow('Price BRL cents must be greater than 0');
    });
  });

  describe('Tenant Entity', () => {
    it('should create a Tenant instance correctly', () => {
      const tenantProps = {
        id: 'uuid-tenant',
        status: 'active' as const,
        photoStorageLimit: 500000,
        stripeCustomerId: 'cus_123',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const tenant = new Tenant(tenantProps);
      expect(tenant.photoStorageLimit).toBe(500000);
    });

    it('should throw an error if photo storage limit is less than or equal to 0', () => {
      const tenantProps = {
        id: 'uuid-tenant',
        status: 'active' as const,
        photoStorageLimit: 0,
        stripeCustomerId: 'cus_123',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      expect(() => new Tenant(tenantProps)).toThrow('Photo storage limit must be greater than 0');
    });

    it('should throw an error if status is invalid', () => {
      const tenantProps = {
        id: 'uuid-tenant',
        status: 'invalid' as any,
        photoStorageLimit: 500000,
        stripeCustomerId: 'cus_123',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      expect(() => new Tenant(tenantProps)).toThrow('Invalid tenant status');
    });
  });

  describe('Subscription Entity', () => {
    it('should create a Subscription instance correctly', () => {
      const subProps = {
        id: 'uuid-sub',
        tenantId: 'uuid-tenant',
        planId: 'uuid-plan',
        status: 'active' as const,
        stripeSubscriptionId: 'sub_123',
        startsAt: new Date(),
        endsAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const sub = new Subscription(subProps);
      expect(sub.status).toBe('active');
    });

    it('should throw an error on invalid status', () => {
      const subProps = {
        id: 'uuid-sub',
        tenantId: 'uuid-tenant',
        planId: 'uuid-plan',
        status: 'invalid' as any,
        stripeSubscriptionId: 'sub_123',
        startsAt: new Date(),
        endsAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      expect(() => new Subscription(subProps)).toThrow('Invalid subscription status');
    });
  });

  describe('Store Entity', () => {
    it('should create a Store instance correctly', () => {
      const storeProps = {
        id: 'uuid-store',
        tenantId: 'uuid-tenant',
        slug: 'my-store',
        name: 'My Store',
        description: 'Store Description',
        logoUrl: 'http://image.url',
        whatsappNumber: '11999999999',
        active: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const store = new Store(storeProps);
      expect(store.slug).toBe('my-store');
    });

    it('should throw error if slug is empty', () => {
      const storeProps = {
        id: 'uuid-store',
        tenantId: 'uuid-tenant',
        slug: '',
        name: 'My Store',
        description: null,
        logoUrl: null,
        whatsappNumber: null,
        active: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      expect(() => new Store(storeProps)).toThrow('Store slug is required');
    });

    it('should throw error if name is empty', () => {
      const storeProps = {
        id: 'uuid-store',
        tenantId: 'uuid-tenant',
        slug: 'my-store',
        name: '',
        description: null,
        logoUrl: null,
        whatsappNumber: null,
        active: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      expect(() => new Store(storeProps)).toThrow('Store name is required');
    });
  });

  describe('Category Entity', () => {
    it('should create a Category instance correctly', () => {
      const catProps = {
        id: 'uuid-cat',
        storeId: 'uuid-store',
        tenantId: 'uuid-tenant',
        name: 'Electronics',
        description: null,
        sortOrder: 1,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const category = new Category(catProps);
      expect(category.name).toBe('Electronics');
    });

    it('should throw error if name is empty', () => {
      const catProps = {
        id: 'uuid-cat',
        storeId: 'uuid-store',
        tenantId: 'uuid-tenant',
        name: '',
        description: null,
        sortOrder: 1,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      expect(() => new Category(catProps)).toThrow('Category name is required');
    });
  });

  describe('Product Entity', () => {
    const validProps = {
      id: 'uuid-product',
      storeId: 'uuid-store',
      tenantId: 'uuid-tenant',
      categoryId: 'uuid-cat',
      name: 'iPhone 15',
      description: 'Latest iPhone',
      priceCents: 99900,
      promoPriceCents: null,
      promoEndsAt: null,
      details: {},
      available: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('should create a Product instance correctly', () => {
      const product = new Product(validProps);
      expect(product.name).toBe('iPhone 15');
    });

    it('should throw error if name is empty', () => {
      expect(() => new Product({ ...validProps, name: '' })).toThrow('Product name is required');
    });

    it('should throw error if price is 0 or negative', () => {
      expect(() => new Product({ ...validProps, priceCents: 0 })).toThrow('Price cents must be greater than 0');
    });

    it('should throw error if promoPriceCents is 0 or negative', () => {
      expect(() => new Product({ ...validProps, promoPriceCents: 0 })).toThrow('Promo price cents must be greater than 0');
    });

    it('should throw error if promoPriceCents is greater than or equal to priceCents', () => {
      expect(() => new Product({ ...validProps, promoPriceCents: 100000 })).toThrow('Promo price cents must be less than base price cents');
    });

    it('should throw error if promoEndsAt is defined but promoPriceCents is null', () => {
      expect(() => new Product({ ...validProps, promoEndsAt: new Date() })).toThrow('Promo ends at requires promo price cents to be defined');
    });
  });

  describe('ProductImage Entity', () => {
    it('should create ProductImage correctly', () => {
      const imgProps = {
        id: 'uuid-img',
        productId: 'uuid-product',
        url: 'http://image.url/img.png',
        sortOrder: 1,
        createdAt: new Date()
      };
      const img = new ProductImage(imgProps);
      expect(img.url).toBe(imgProps.url);
    });

    it('should throw error if url is empty', () => {
      const imgProps = {
        id: 'uuid-img',
        productId: 'uuid-product',
        url: '',
        sortOrder: 1,
        createdAt: new Date()
      };
      expect(() => new ProductImage(imgProps)).toThrow('Product image URL is required');
    });
  });

  describe('ProductVariation Entity', () => {
    it('should create ProductVariation correctly', () => {
      const varProps = {
        id: 'uuid-var',
        productId: 'uuid-product',
        label: 'Color',
        sortOrder: 1,
        createdAt: new Date()
      };
      const variation = new ProductVariation(varProps);
      expect(variation.label).toBe(varProps.label);
    });

    it('should throw error if label is empty', () => {
      const varProps = {
        id: 'uuid-var',
        productId: 'uuid-product',
        label: '',
        sortOrder: 1,
        createdAt: new Date()
      };
      expect(() => new ProductVariation(varProps)).toThrow('Product variation label is required');
    });
  });

  describe('VariationOption Entity', () => {
    it('should create VariationOption correctly', () => {
      const optProps = {
        id: 'uuid-opt',
        variationId: 'uuid-var',
        value: 'Black',
        sortOrder: 1,
        createdAt: new Date()
      };
      const opt = new VariationOption(optProps);
      expect(opt.value).toBe(optProps.value);
    });

    it('should throw error if value is empty', () => {
      const optProps = {
        id: 'uuid-opt',
        variationId: 'uuid-var',
        value: '',
        sortOrder: 1,
        createdAt: new Date()
      };
      expect(() => new VariationOption(optProps)).toThrow('Variation option value is required');
    });
  });
});
