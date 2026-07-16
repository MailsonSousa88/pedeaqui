/**
 * Integration E2E — Fluxo completo de onboarding do lojista
 * Requirement: ONBOARD-22
 *
 * Executa os 5 passos em sequência validando que IDs propagam corretamente.
 * Este teste não usa mocks — valida o contrato real ponta a ponta.
 */

import request from 'supertest';
import app from '../../app';
import {
  deleteTestUser,
  makeTestEmail,
  getTestCPF,
  getTestCNPJ,
  supabaseAdmin,
} from '../../test-helpers/integrationSetup';

describe('E2E — Fluxo completo de Onboarding do Lojista', () => {
  const email = makeTestEmail();
  const password = 'TestPass@123';
  const cpf = getTestCPF(4);
  const cnpj = getTestCNPJ(3);
  const slug = `e2e-loja-${Date.now()}`;

  let profileId: string;
  let accessToken: string;
  let storeId: string;
  let categoryId: string;
  let productId: string;

  afterAll(async () => {
    if (profileId) await deleteTestUser(profileId);
  });

  it('Passo 1 — Signup: deve criar perfil com CPF válido', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email, password, name: 'E2E Lojista', phone: '11911111111', document: cpf });

    expect(res.status).toBe(201);
    expect(res.body.profile).toHaveProperty('id');

    profileId = res.body.profile.id;
  });

  it('Passo 2 — Login: deve retornar accessToken válido', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body.profile.id).toBe(profileId);

    accessToken = res.body.accessToken;
  });

  it('Passo 3 — Tenant: deve registrar tenant + subscription trial com mesmo ID', async () => {
    const res = await request(app)
      .post('/api/tenants')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ document: cnpj });

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(profileId); // tenant.id === profile.id

    // Verifica subscription de trial
    const { data: sub } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('tenant_id', profileId)
      .single();

    expect(sub?.status).toBe('active');
    expect(sub?.plan_id).toBeNull();
  });

  it('Passo 4 — Store: deve criar loja e categoria "Todos" automática', async () => {
    const res = await request(app)
      .post('/api/stores')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        slug,
        storeName: 'E2E Loja',
        horarioAbertura: '08:00',
        horarioFechamento: '18:00',
        endereco: 'Rua E2E, 100',
        city: 'Sao Paulo',
        state: 'SP',
        whatsappNumber: '11999990007',
      });

    if (res.status !== 201) {
      console.error('E2E - STORE CREATE FAILED:', res.body);
    }

    expect(res.status).toBe(201);
    expect(res.body.tenantId).toBe(profileId); // store.tenantId === profile.id
    expect(res.body.slug).toBe(slug);

    storeId = res.body.id;

    // Categoria "Todos" criada automaticamente
    const { data: cats } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('store_id', storeId);

    expect(cats).toHaveLength(1);
    expect(cats![0].name).toBe('Todos');
    categoryId = cats![0].id;
  });

  it('Passo 5 — Produto: deve criar produto com mesmo tenantId do perfil', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        storeId,
        categoryId,
        name: 'X-Burguer E2E',
        description: 'Produto do fluxo completo',
        priceCents: 3500,
      });

    expect(res.status).toBe(201);
    expect(res.body.tenantId).toBe(profileId); // produto.tenantId === profile.id
    expect(res.body.storeId).toBe(storeId);
    expect(res.body.categoryId).toBe(categoryId);

    productId = res.body.id;
  });

  it('Verificação final — todos os recursos compartilham o mesmo tenantId', () => {
    expect(profileId).toBeDefined();
    expect(storeId).toBeDefined();
    expect(categoryId).toBeDefined();
    expect(productId).toBeDefined();
    // Todos os IDs de tenant são o mesmo profileId por design
  });

  it('Verificação final — loja e produto acessíveis publicamente', async () => {
    const storeRes = await request(app).get(`/api/stores/${slug}`);
    expect(storeRes.status).toBe(200);

    const productsRes = await request(app).get(`/api/products/store/${storeId}`);
    expect(productsRes.status).toBe(200);
    expect(productsRes.body.some((p: any) => p.name === 'X-Burguer E2E')).toBe(true);
  });
});
