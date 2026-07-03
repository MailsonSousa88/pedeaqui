/**
 * Integration test helpers.
 *
 * Provides setup and teardown utilities for integration tests.
 * Uses the local Supabase instance (SUPABASE_URL + SUPABASE_ANON_KEY from .env).
 *
 * Design contract:
 *  - All test users are created with a unique email (uuid-based) to avoid conflicts
 *  - Each test suite is responsible for cleaning up its own data via deleteTestUser()
 *  - cleanup cascades: auth user → profile → tenant → subscription → store → categories → products
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const SUPABASE_URL = process.env.SUPABASE_URL || 'http://127.0.0.1:54321';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

// Service-role client for cleanup (bypasses RLS)
const SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

export const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export const supabaseAnon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ---------------------------------------------------------------------------
// Test data factory
// ---------------------------------------------------------------------------

export function makeTestEmail(): string {
  return `test-${Date.now()}-${Math.random().toString(36).slice(2)}@pedeaqui-test.local`;
}

// Pool de CPFs válidos para testes — cada suite deve usar um índice diferente
// para evitar conflito de unique constraint ao rodar em paralelo.
const VALID_CPFS = [
  '13237289531', // auth suite
  '84493662832', // tenant suite
  '28352144707', // store suite
  '54306138003', // product suite
  '77020608752', // e2e suite
  '12681857600', // reserva
];

const VALID_CNPJS = [
  '48717882000137', // tenant suite
  '72871115000162', // store suite
  '22456475000120', // product suite
  '11734672000147', // e2e suite
];

/**
 * Retorna um CPF válido fixo por índice (0-5).
 * Cada suite de integração deve usar um índice diferente.
 */
export function getTestCPF(index: number): string {
  return VALID_CPFS[index % VALID_CPFS.length];
}

/**
 * Retorna um CNPJ válido fixo por índice (0-3).
 * Cada suite de integração deve usar um índice diferente.
 */
export function getTestCNPJ(index: number): string {
  return VALID_CNPJS[index % VALID_CNPJS.length];
}

/** @deprecated Use getTestCPF(index) para evitar conflitos entre suites */
export function makeTestCPF(): string {
  return VALID_CPFS[0];
}

/** @deprecated Use getTestCNPJ(index) para evitar conflitos entre suites */
export function makeTestCNPJ(): string {
  return VALID_CNPJS[0];
}

// ---------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------

/**
 * Deletes all data associated with a test user.
 * Order respects FK constraints: products → categories → stores → subscriptions → tenants → profiles → auth.users
 */
export async function deleteTestUser(userId: string): Promise<void> {
  // Delete products (soft-deleted or not, by tenant_id)
  await supabaseAdmin.from('products').delete().eq('tenant_id', userId);

  // Delete categories
  await supabaseAdmin.from('categories').delete().eq('tenant_id', userId);

  // Delete stores
  await supabaseAdmin.from('stores').delete().eq('tenant_id', userId);

  // Delete subscriptions
  await supabaseAdmin.from('subscriptions').delete().eq('tenant_id', userId);

  // Delete tenant
  await supabaseAdmin.from('tenants').delete().eq('id', userId);

  // Delete profile
  await supabaseAdmin.from('profiles').delete().eq('id', userId);

  // Delete auth user (must be last)
  await supabaseAdmin.auth.admin.deleteUser(userId);
}
