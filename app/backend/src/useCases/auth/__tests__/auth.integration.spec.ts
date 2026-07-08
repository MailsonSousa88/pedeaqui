/**
 * Integration Tests — Auth (signup + login)
 * Requirements: ONBOARD-01 to ONBOARD-05
 *
 * Uses the real Supabase local instance.
 * Each test suite creates isolated users and cleans up in afterAll.
 */

import request from 'supertest';
import app from '../../../app';
import {
  deleteTestUser,
  makeTestEmail,
  getTestCPF,
  supabaseAdmin,
} from '../../../test-helpers/integrationSetup';

describe('Auth Integration — Signup + Login', () => {
  const email = makeTestEmail();
  const password = 'TestPass@123';
  const cpf = getTestCPF(0); // auth suite usa índice 0
  let userId: string;

  afterAll(async () => {
    if (userId) {
      await deleteTestUser(userId);
    }
  });

  // ONBOARD-01
  it('POST /api/auth/signup com dados válidos → 201 + profile', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email, password, name: 'Lojista Teste', phone: '11999999999', document: cpf });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
    expect(res.body.profile).toHaveProperty('id');
    expect(res.body.profile).toHaveProperty('name', 'Lojista Teste');

    userId = res.body.profile.id;
  });

  // ONBOARD-02
  it('POST /api/auth/signup com CPF duplicado → 400', async () => {
    const duplicateEmail = makeTestEmail();
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: duplicateEmail, password, name: 'Outro', phone: '11888888888', document: cpf });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/CPF already registered/i);

    // Clean up the auth user that may have been created before the CPF check
    const { data } = await supabaseAdmin.auth.admin.listUsers();
    const extra = data?.users?.find((u) => u.email === duplicateEmail);
    if (extra) await supabaseAdmin.auth.admin.deleteUser(extra.id);
  });

  // ONBOARD-03
  it('POST /api/auth/signup sem campos obrigatórios → 400', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: makeTestEmail(), password });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  // ONBOARD-04
  it('POST /api/auth/login com credenciais válidas → 200 + tokens', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    expect(res.body.profile).toHaveProperty('id', userId);
  });

  // ONBOARD-05
  it('POST /api/auth/login com senha incorreta → 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'SenhaErrada@999' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
