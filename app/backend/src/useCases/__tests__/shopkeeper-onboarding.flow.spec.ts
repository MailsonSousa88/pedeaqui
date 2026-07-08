/**
 * Teste de Fluxo Orquestrado: Onboarding do Lojista
 *
 * Valida o fluxo completo em sequência usando mocks compartilhados:
 *   [1] SignUpUseCase       → cria Profile com CPF
 *   [2] UpdateProfileUseCase → atualiza dados do perfil
 *   [3] RegisterTenantUseCase → cria Tenant + subscription de trial
 *   [4] CreateStoreUseCase  → cria Loja (exige subscription ativa)
 *   [5] CreateProductUseCase → insere produto com category_id obrigatório
 *
 * Fase: Exploração — testes unitários orquestrados (sem conexão com banco).
 */

import { SignUpUseCase } from "../auth/SignUpUseCase";
import { UpdateProfileUseCase } from "../auth/UpdateProfileUseCase";
import { RegisterTenantUseCase } from "../tenant/RegisterTenantUseCase";
import { CreateStoreUseCase } from "../store/CreateStoreUseCase";
import { CreateProductUseCase } from "../product/CreateProductUseCase";

import { IAuthRepository } from "../../repositories/IAuthRepository";
import { IProfileRepository } from "../../repositories/IProfileRepository";
import { ITenantRepository } from "../../repositories/ITenantRepository";
import { ISubscriptionRepository } from "../../repositories/ISubscriptionRepository";
import { IStoreRepository } from "../../repositories/IStoreRepository";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { IProductRepository } from "../../repositories/IProductRepository";

import { Profile } from "../../models/Profile";
import { Tenant } from "../../models/Tenant";
import { Subscription } from "../../models/Subscription";
import { Store } from "../../models/Store";
import { Category } from "../../models/Category";
import { Product } from "../../models/Product";
import {
  makeTestAddress,
  makeTestCNPJ,
  makeTestCPF,
  makeTestEmail,
  makeTestPhone,
  makeTestPriceCents,
  makeTestProductDescription,
  makeTestProductName,
  makeTestProfileName,
  makeTestStoreName,
  makeTestStoreSlug,
} from "../../test-helpers/testDataFactory";

// --------------------------------------------------------------------------
// Mocks dos validators (isolados de lógica real para controlar o fluxo)
// --------------------------------------------------------------------------
jest.mock("../../utils/cpfValidator", () => ({
  isValidCPF: jest.fn((doc: string) => doc.length === 11),
  sanitizeCPF: jest.fn((doc: string) => doc.replace(/\D/g, "")),
}));

jest.mock("../../utils/cnpjValidator", () => ({
  isValidCNPJ: jest.fn((doc: string) => doc.length === 14),
  sanitizeCNPJ: jest.fn((doc: string) => doc.replace(/\D/g, "")),
}));

// --------------------------------------------------------------------------
// Fixtures compartilhadas entre os steps
// --------------------------------------------------------------------------
const PROFILE_ID = "user-onboarding-001";
const VALID_CPF = makeTestCPF();
const VALID_CNPJ = makeTestCNPJ();
const PROFILE_NAME = makeTestProfileName();
const PROFILE_EMAIL = makeTestEmail();
const INITIAL_PHONE = makeTestPhone();
const UPDATED_PHONE = makeTestPhone();
const STORE_ID = "store-001";
const STORE_SLUG = makeTestStoreSlug("maria-loja");
const STORE_NAME = makeTestStoreName();
const STORE_ADDRESS = makeTestAddress();
const STORE_WHATSAPP = makeTestPhone();
const CATEGORY_ID = "cat-todos-001";
const PRODUCT_ID = "prod-001";
const PRODUCT_NAME = makeTestProductName();
const PRODUCT_DESCRIPTION = makeTestProductDescription();
const PRODUCT_PRICE_CENTS = makeTestPriceCents();
const now = new Date();
const trialEndsAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

describe("Fluxo de Onboarding do Lojista", () => {
  // Mocks de repositórios
  let authRepo: jest.Mocked<IAuthRepository>;
  let profileRepo: jest.Mocked<IProfileRepository>;
  let tenantRepo: jest.Mocked<ITenantRepository>;
  let subscriptionRepo: jest.Mocked<ISubscriptionRepository>;
  let storeRepo: jest.Mocked<IStoreRepository>;
  let categoryRepo: jest.Mocked<ICategoryRepository>;
  let productRepo: jest.Mocked<IProductRepository>;

  // Estado compartilhado entre steps (simula persistência)
  let createdProfile: Profile;
  let createdTenant: Tenant;
  let trialSubscription: Subscription;
  let createdStore: Store;
  let defaultCategory: Category;
  let createdProduct: Product;

  beforeAll(() => {
    // -- Auth Repository --
    authRepo = {
      signUp: jest.fn().mockResolvedValue({ authUserId: PROFILE_ID }),
      signIn: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      updateUserPassword: jest.fn(),
      refreshSession: jest.fn(),
    };

    // -- Profile Repository --
    profileRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findByDocument: jest.fn().mockResolvedValue(null),
      update: jest.fn(),
    };

    // -- Tenant Repository --
    tenantRepo = {
      findById: jest.fn().mockResolvedValue(null),
      getDetails: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    // -- Subscription Repository --
    subscriptionRepo = {
      findById: jest.fn(),
      findByTenantId: jest.fn(),
      createOrUpdate: jest.fn(),
    };

    // -- Store Repository --
    storeRepo = {
      findById: jest.fn(),
      findByTenantId: jest.fn().mockResolvedValue(null),
      findBySlug: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      update: jest.fn(),
    };

    // -- Category Repository --
    categoryRepo = {
      findById: jest.fn(),
      findByStoreId: jest.fn(),
      countActiveByStoreId: jest.fn(),
      findByTenantId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
    };

    // -- Product Repository --
    productRepo = {
      findById: jest.fn(),
      findByStoreId: jest.fn(),
      findByCategoryId: jest.fn(),
      countActiveByCategoryId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      toggleAvailability: jest.fn(),
      softDelete: jest.fn(),
    };
  });

  // -------------------------------------------------------------------------
  // Step 1: Cadastro (SignUp)
  // -------------------------------------------------------------------------
  describe("Step 1 — Cadastro do usuário (SignUp)", () => {
    it("deve criar perfil com CPF válido", async () => {
      const mockProfile = new Profile({
        id: PROFILE_ID,
        name: PROFILE_NAME,
        phone: INITIAL_PHONE,
        document: VALID_CPF,
      });

      profileRepo.create.mockResolvedValueOnce(mockProfile);

      const useCase = new SignUpUseCase(authRepo, profileRepo);
      createdProfile = await useCase.execute({
        email: PROFILE_EMAIL,
        password: "senha@123",
        name: PROFILE_NAME,
        phone: INITIAL_PHONE,
        document: VALID_CPF,
      });

      expect(createdProfile.id).toBe(PROFILE_ID);
      expect(createdProfile.document).toBe(VALID_CPF);
      expect(authRepo.signUp).toHaveBeenCalledWith(
        PROFILE_EMAIL,
        "senha@123",
      );
      expect(profileRepo.create).toHaveBeenCalled();
    });
  });

  // -------------------------------------------------------------------------
  // Step 2: Atualização de perfil (UpdateProfile)
  // -------------------------------------------------------------------------
  describe("Step 2 — Atualização de dados do perfil", () => {
    it("deve atualizar o telefone do perfil existente", async () => {
      const updatedProfile = new Profile({
        id: PROFILE_ID,
        name: PROFILE_NAME,
        phone: UPDATED_PHONE,
        document: VALID_CPF,
      });

      profileRepo.findById.mockResolvedValueOnce(createdProfile);
      profileRepo.update.mockResolvedValueOnce(updatedProfile);

      const useCase = new UpdateProfileUseCase(profileRepo);
      const result = await useCase.execute({
        profileId: PROFILE_ID,
        phone: UPDATED_PHONE,
      });

      expect(result.phone).toBe(UPDATED_PHONE);
      expect(profileRepo.update).toHaveBeenCalled();
      createdProfile = result; // propaga o estado atualizado
    });
  });

  // -------------------------------------------------------------------------
  // Step 3: Registro como Tenant (com subscription de trial)
  // -------------------------------------------------------------------------
  describe("Step 3 — Registro como entidade comercial (Tenant)", () => {
    it("deve criar tenant e subscription de trial com CNPJ", async () => {
      const mockTenant = new Tenant({
        id: PROFILE_ID,
        status: "active",
        businessDocument: VALID_CNPJ,
        photoStorageLimit: 524288000,
        stripeCustomerId: null,
        createdAt: now,
        updatedAt: now,
      });

      const mockTrial = new Subscription({
        id: "sub-trial-001",
        tenantId: PROFILE_ID,
        planId: null,
        status: "active",
        startsAt: now,
        endsAt: trialEndsAt,
        createdAt: now,
        updatedAt: now,
      });

      profileRepo.findById.mockResolvedValueOnce(createdProfile);
      tenantRepo.create.mockResolvedValueOnce(mockTenant);
      subscriptionRepo.createOrUpdate.mockResolvedValueOnce(mockTrial);

      const useCase = new RegisterTenantUseCase(
        tenantRepo,
        profileRepo,
        subscriptionRepo,
      );
      const result = await useCase.execute({
        profileId: PROFILE_ID,
        document: VALID_CNPJ,
      });

      expect(result.tenant.id).toBe(PROFILE_ID);
      expect(result.tenant.businessDocument).toBe(VALID_CNPJ);
      expect(result.trialSubscription.status).toBe("active");
      expect(result.trialSubscription.planId).toBeNull();

      createdTenant = result.tenant;
      trialSubscription = result.trialSubscription;
    });
  });

  // -------------------------------------------------------------------------
  // Step 4: Criação da Loja (requer subscription ativa)
  // -------------------------------------------------------------------------
  describe("Step 4 — Criação da loja", () => {
    it('deve criar loja e categoria padrão "Todos" usando o trial', async () => {
      const mockStore = new Store({
        id: STORE_ID,
        tenantId: PROFILE_ID,
        slug: STORE_SLUG,
        storeName: STORE_NAME,
        horarioAbertura: "08:00",
        horarioFechamento: "20:00",
        endereco: STORE_ADDRESS,
        descricao: "A melhor loja",
        logoUrl: null,
        whatsappNumber: STORE_WHATSAPP,
        active: true,
        deletedAt: null,
        createdAt: now,
        updatedAt: now,
      });

      const mockDefaultCategory = new Category({
        id: CATEGORY_ID,
        tenantId: PROFILE_ID,
        storeId: STORE_ID,
        name: "Todos",
        description: null,
        sortOrder: 0,
        deletedAt: null,
        createdAt: now,
        updatedAt: now,
      });

      // Trial subscription está ativa
      subscriptionRepo.findByTenantId.mockResolvedValueOnce(trialSubscription);
      storeRepo.create.mockResolvedValueOnce(mockStore);
      categoryRepo.create.mockResolvedValueOnce(mockDefaultCategory);

      const useCase = new CreateStoreUseCase(
        storeRepo,
        subscriptionRepo,
        categoryRepo,
      );
      createdStore = await useCase.execute({
        tenantId: PROFILE_ID,
        slug: STORE_SLUG,
        storeName: STORE_NAME,
        horarioAbertura: "08:00",
        horarioFechamento: "20:00",
        endereco: STORE_ADDRESS,
        descricao: "A melhor loja",
        whatsappNumber: STORE_WHATSAPP,
      });

      expect(createdStore.id).toBe(STORE_ID);
      expect(createdStore.tenantId).toBe(PROFILE_ID);
      expect(categoryRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: "Todos", storeId: STORE_ID }),
      );

      defaultCategory = mockDefaultCategory;
    });
  });

  // -------------------------------------------------------------------------
  // Step 5: Inserção de Produto (requer category_id — NOT NULL)
  // -------------------------------------------------------------------------
  describe("Step 5 — Inserção de produto", () => {
    it("deve criar produto com category_id obrigatório", async () => {
      const mockProduct = new Product({
        id: PRODUCT_ID,
        tenantId: PROFILE_ID,
        storeId: STORE_ID,
        categoryId: CATEGORY_ID,
        name: PRODUCT_NAME,
        description: PRODUCT_DESCRIPTION,
        priceCents: PRODUCT_PRICE_CENTS,
        promoPriceCents: null,
        promoEndsAt: null,
        details: {},
        available: true,
        deletedAt: null,
        createdAt: now,
        updatedAt: now,
      });

      storeRepo.findById.mockResolvedValueOnce(createdStore);
      categoryRepo.findById.mockResolvedValueOnce(defaultCategory);
      productRepo.create.mockResolvedValueOnce(mockProduct);

      const useCase = new CreateProductUseCase(
        productRepo,
        categoryRepo,
        storeRepo,
      );
      createdProduct = await useCase.execute({
        tenantId: PROFILE_ID,
        storeId: STORE_ID,
        categoryId: CATEGORY_ID,
        name: PRODUCT_NAME,
        description: PRODUCT_DESCRIPTION,
        priceCents: PRODUCT_PRICE_CENTS,
      });

      expect(createdProduct.name).toBe(PRODUCT_NAME);
      expect(createdProduct.priceCents).toBe(PRODUCT_PRICE_CENTS);
      expect(createdProduct.categoryId).toBe(CATEGORY_ID);
      expect(createdProduct.tenantId).toBe(PROFILE_ID);
    });

    it("deve falhar ao tentar criar produto sem category_id", async () => {
      storeRepo.findById.mockResolvedValueOnce(createdStore);
      // categoryRepo retorna null — categoria inválida
      categoryRepo.findById.mockResolvedValueOnce(null);

      const useCase = new CreateProductUseCase(
        productRepo,
        categoryRepo,
        storeRepo,
      );

      await expect(
        useCase.execute({
          tenantId: PROFILE_ID,
          storeId: STORE_ID,
          categoryId: "cat-invalida",
          name: "Produto Órfão",
          priceCents: 1000,
        }),
      ).rejects.toThrow("Conflict: Category does not exist");
    });
  });

  // -------------------------------------------------------------------------
  // Verificação de estado final do fluxo
  // -------------------------------------------------------------------------
  describe("Estado final do fluxo", () => {
    it("todos os recursos devem ter sido criados com o mesmo tenantId", () => {
      expect(createdProfile.id).toBe(PROFILE_ID);
      expect(createdTenant.id).toBe(PROFILE_ID);
      expect(trialSubscription.tenantId).toBe(PROFILE_ID);
      expect(createdStore.tenantId).toBe(PROFILE_ID);
      expect(defaultCategory.tenantId).toBe(PROFILE_ID);
      expect(createdProduct.tenantId).toBe(PROFILE_ID);
    });

    it("a subscription de trial deve estar ativa e sem plan_id", () => {
      expect(trialSubscription.status).toBe("active");
      expect(trialSubscription.planId).toBeNull();
      expect(trialSubscription.endsAt > trialSubscription.startsAt).toBe(true);
    });

    it("a loja deve estar ativa e a categoria padrão deve pertencer a ela", () => {
      expect(createdStore.active).toBe(true);
      expect(defaultCategory.storeId).toBe(createdStore.id);
      expect(defaultCategory.name).toBe("Todos");
    });
  });
});
