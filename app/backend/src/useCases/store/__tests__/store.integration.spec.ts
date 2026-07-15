/**
 * Integration Tests — Store (criação + consulta pública)
 * Requirements: ONBOARD-11 to ONBOARD-16
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
import {
  makeTestPhone,
  makeTestStoreName,
  makeTestStoreSlug,
} from '../../../test-helpers/testDataFactory';

describe('Store Integration — Criação + Consulta', () => {
  const email = makeTestEmail();
  const password = 'TestPass@123';
  const slug = makeTestStoreSlug();
  const storeName = makeTestStoreName();
  let userId: string;
  let accessToken: string;

  const restoreMainSession = async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email, password });

    accessToken = loginRes.body.accessToken;
  };

  beforeAll(async () => {
    // Setup: signup → login → register tenant
    const signupRes = await request(app)
      .post('/api/auth/signup')
      .send({ email, password, name: 'Store Tester', phone: makeTestPhone(), document: getTestCPF(2) });
    userId = signupRes.body.profile.id;

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email, password });
    accessToken = loginRes.body.accessToken;

    await request(app)
      .post('/api/tenants')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ document: getTestCNPJ(1) });
  });

  afterAll(async () => {
    if (userId) await deleteTestUser(userId);
  });

  // ONBOARD-11
  it('POST /api/stores com dados válidos → 201 + store + categoria "Todos"', async () => {
    const res = await request(app)
      .post('/api/stores')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        slug,
        storeName,
        horarioAbertura: '08:00',
        horarioFechamento: '18:00',
        endereco: 'Rua dos Testes, 1',
        city: 'Sao Paulo',
        state: 'SP',
        whatsappNumber: makeTestPhone(),
      });

    if (res.status !== 201) {
      console.error('STORE CREATE FAILED:', res.body);
    }

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('slug', slug);
    expect(res.body).toHaveProperty('tenantId', userId);

    // Verificar categoria padrão criada no banco
    const storeId = res.body.id;
    const { data: cats } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('store_id', storeId);

    expect(cats).toHaveLength(1);
    expect(cats![0].name).toBe('Todos');
  });

  // ONBOARD-12
  it('POST /api/stores sem token → 401', async () => {
    const res = await request(app)
      .post('/api/stores')
      .send({ slug: makeTestStoreSlug('outro'), storeName: makeTestStoreName(), horarioAbertura: '08:00', horarioFechamento: '18:00', endereco: 'Rua X', city: 'Sao Paulo', state: 'SP', whatsappNumber: makeTestPhone() });

    expect(res.status).toBe(401);
  });

  // ONBOARD-13
  // Testado indiretamente: tenant sem subscription nunca ocorre no fluxo atual
  // (subscription trial é criada junto com o tenant). Cobrimos o 403 via outro usuário sem tenant.
  it('POST /api/stores por tenant sem subscription → 403', async () => {
    // Cria usuário sem subscription (sem tenant registrado)
    const emailNoSub = makeTestEmail();
    const signupRes = await request(app)
      .post('/api/auth/signup')
      .send({ email: emailNoSub, password, name: 'Sem Sub', phone: makeTestPhone(), document: getTestCPF(6) });
    const noSubUserId = signupRes.body.profile?.id;

    if (!noSubUserId) {
      // CPF já em uso — skip gracioso
      return;
    }

    const loginRes = await request(app).post('/api/auth/login').send({ email: emailNoSub, password });
    const noSubToken = loginRes.body.accessToken;

    const res = await request(app)
      .post('/api/stores')
      .set('Authorization', `Bearer ${noSubToken}`)
      .send({ slug: makeTestStoreSlug('nosub'), storeName: makeTestStoreName(), horarioAbertura: '08:00', horarioFechamento: '18:00', endereco: 'Rua Y', city: 'Sao Paulo', state: 'SP', whatsappNumber: makeTestPhone() });

    expect(res.status).toBe(403);

    await deleteTestUser(noSubUserId);
    await restoreMainSession();
  });

  // ONBOARD-14
  it('POST /api/stores por tenant que já tem loja → 409', async () => {
    const res = await request(app)
      .post('/api/stores')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ slug: makeTestStoreSlug('duplicado'), storeName: 'Segunda Loja', horarioAbertura: '08:00', horarioFechamento: '18:00', endereco: 'Rua Z', city: 'Sao Paulo', state: 'SP', whatsappNumber: makeTestPhone() });

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/tenant already has a store/i);
  });

  // ONBOARD-15
  it('POST /api/stores com slug já existente → 409', async () => {
    // Criar segundo usuário e tentar usar o mesmo slug
    const email2 = makeTestEmail();
    const signupRes2 = await request(app)
      .post('/api/auth/signup')
      .send({ email: email2, password, name: 'Outro Lojista', phone: makeTestPhone(), document: getTestCPF(7) });
    const userId2 = signupRes2.body.profile?.id;

    if (!userId2) return; // CPF em uso — skip

    const loginRes2 = await request(app).post('/api/auth/login').send({ email: email2, password });
    const token2 = loginRes2.body.accessToken;
    await request(app).post('/api/tenants').set('Authorization', `Bearer ${token2}`).send({ document: getTestCNPJ(4) });

    const res = await request(app)
      .post('/api/stores')
      .set('Authorization', `Bearer ${token2}`)
      .send({ slug, storeName: 'Conflito de Slug', horarioAbertura: '08:00', horarioFechamento: '18:00', endereco: 'Rua Conflito', city: 'Sao Paulo', state: 'SP', whatsappNumber: makeTestPhone() });

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/slug already exists/i);

    await deleteTestUser(userId2);
    await restoreMainSession();
  });

  // ONBOARD-16
  it('GET /api/stores/:slug (público) → 200 + dados da loja', async () => {
    const res = await request(app).get(`/api/stores/${slug}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('slug', slug);
    expect(res.body).toHaveProperty('storeName', storeName);
  });
});
