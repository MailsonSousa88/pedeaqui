/**
 * Integration Tests — Tenant (registro + consulta)
 * Requirements: ONBOARD-06 to ONBOARD-10
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

describe('Tenant Integration — Registro + Consulta', () => {
  const email = makeTestEmail();
  const password = 'TestPass@123';
  let userId: string;
  let accessToken: string;

  beforeAll(async () => {
    // Criar usuário e fazer login
    const signupRes = await request(app)
      .post('/api/auth/signup')
      .send({ email, password, name: 'Tenant Tester', phone: '11977777777', document: getTestCPF(1) });
      
    if (signupRes.status !== 201) {
      console.error('SIGNUP FAILED:', signupRes.body);
    }
    
    userId = signupRes.body.profile?.id;

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email, password });

    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    if (userId) await deleteTestUser(userId);
  });

  // ONBOARD-06
  it('POST /api/tenants com CNPJ válido → 201 + tenant com subscription trial', async () => {
    const res = await request(app)
      .post('/api/tenants')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ document: getTestCNPJ(0) });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id', userId);
    expect(res.body).toHaveProperty('status', 'active');

    // Verifica subscription de trial no banco
    const { data: sub } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('tenant_id', userId)
      .single();

    expect(sub).not.toBeNull();
    expect(sub?.status).toBe('active');
    expect(sub?.plan_id).toBeNull();
  });

  // ONBOARD-07
  it('POST /api/tenants sem token → 401', async () => {
    const res = await request(app)
      .post('/api/tenants')
      .send({ document: getTestCNPJ(0) });

    expect(res.status).toBe(401);
  });

  // ONBOARD-08
  it('POST /api/tenants com documento inválido → 400', async () => {
    const res = await request(app)
      .post('/api/tenants')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ document: '000' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/invalid document/i);
  });

  // ONBOARD-09
  it('POST /api/tenants para profileId já registrado → 409', async () => {
    const res = await request(app)
      .post('/api/tenants')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ document: getTestCNPJ(0) });

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/tenant already exists/i);
  });

  // ONBOARD-10
  it('GET /api/tenants/me com token válido → 200 + detalhes do tenant', async () => {
    const res = await request(app)
      .get('/api/tenants/me')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('tenantId', userId);
  });
});
