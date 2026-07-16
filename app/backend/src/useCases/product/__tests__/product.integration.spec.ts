/**
 * Integration Tests — Product (criação + listagem pública)
 * Requirements: ONBOARD-17 to ONBOARD-21
 */

import request from 'supertest';
import app from '../../../app';
import {
  deleteTestUser,
  makeTestEmail,
  getTestCPF,
  getTestCNPJ,
  supabaseAdmin,
} from '../../../test-helpers/integrationSetup';

describe('Product Integration — Criação + Listagem', () => {
  const email = makeTestEmail();
  const password = 'TestPass@123';
  const slug = `prod-teste-${Date.now()}`;
  let userId: string;
  let accessToken: string;
  let storeId: string;
  let categoryId: string;

  const restoreMainSession = async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email, password });

    accessToken = loginRes.body.accessToken;
  };

  beforeAll(async () => {
    // Setup completo: signup → login → tenant → store
    const signupRes = await request(app)
      .post('/api/auth/signup')
      .send({ email, password, name: 'Product Tester', phone: '11933333333', document: getTestCPF(3) });
    userId = signupRes.body.profile.id;

    const loginRes = await request(app).post('/api/auth/login').send({ email, password });
    accessToken = loginRes.body.accessToken;

    await request(app)
      .post('/api/tenants')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ document: getTestCNPJ(2) });

    const storeRes = await request(app)
      .post('/api/stores')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ slug, storeName: 'Loja Produto Teste', horarioAbertura: '08:00', horarioFechamento: '18:00', endereco: 'Rua Produto, 1', city: 'Sao Paulo', state: 'SP', whatsappNumber: '11999990006' });

    if (storeRes.status !== 201) {
      console.error('PRODUCT SETUP - STORE CREATE FAILED:', storeRes.body);
    }

    storeId = storeRes.body.id;

    // Pega a categoria padrão "Todos" criada automaticamente
    const { data: cats } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('store_id', storeId)
      .limit(1);
    categoryId = cats![0].id;
  });

  afterAll(async () => {
    if (userId) await deleteTestUser(userId);
  });

  // ONBOARD-17
  it('POST /api/products com dados válidos → 201 + produto', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        storeId,
        categoryId,
        name: 'X-Burguer',
        description: 'O melhor burguer',
        priceCents: 2500,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'X-Burguer');
    expect(res.body).toHaveProperty('priceCents', 2500);
    expect(res.body).toHaveProperty('tenantId', userId);
  });

  // ONBOARD-18
  it('POST /api/products sem token → 401', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ storeId, categoryId, name: 'Sem Auth', priceCents: 1000 });

    expect(res.status).toBe(401);
  });

  // ONBOARD-19
  it('POST /api/products com storeId de outro tenant → 403', async () => {
    // Cria segundo usuário para tentar usar a loja do primeiro
    const email2 = makeTestEmail();
    const signupRes2 = await request(app)
      .post('/api/auth/signup')
      .send({ email: email2, password, name: 'Invasor', phone: '11922222222', document: getTestCPF(8) });
    const userId2 = signupRes2.body.profile?.id;

    if (!userId2) return;

    const loginRes2 = await request(app).post('/api/auth/login').send({ email: email2, password });
    const token2 = loginRes2.body.accessToken;

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token2}`)
      .send({ storeId, categoryId, name: 'Produto Invasor', priceCents: 999 });

    expect(res.status).toBe(403);
    expect(res.body.error).toMatch(/forbidden/i);

    await deleteTestUser(userId2);
    await restoreMainSession();
  });

  // ONBOARD-20
  it('POST /api/products com categoryId inválido → 409', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        storeId,
        categoryId: '00000000-0000-0000-0000-000000000000',
        name: 'Produto Sem Categoria',
        priceCents: 500,
      });

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/category does not exist/i);
  });

  // ONBOARD-21
  it('GET /api/products/store/:storeId (público) → 200 + lista de produtos', async () => {
    const res = await request(app).get(`/api/products/store/${storeId}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty('name', 'X-Burguer');
  });
});
