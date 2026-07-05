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
import {
  makeTestEmail as makeFactoryTestEmail,
  makeTestCPF as makeFactoryTestCPF,
  makeTestCNPJ as makeFactoryTestCNPJ,
} from './testDataFactory';

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
  return makeFactoryTestEmail();
}

const cpfByIndex = new Map<number, string>();
const cnpjByIndex = new Map<number, string>();

/**
 * Retorna um CPF válido por índice.
 * O valor é gerado uma vez por processo para preservar chamadas repetidas na mesma suite.
 */
export function getTestCPF(index: number): string {
  if (!cpfByIndex.has(index)) {
    cpfByIndex.set(index, makeFactoryTestCPF());
  }

  return cpfByIndex.get(index)!;
}

/**
 * Retorna um CNPJ numérico válido por índice.
 * O valor é gerado uma vez por processo para preservar chamadas repetidas na mesma suite.
 */
export function getTestCNPJ(index: number): string {
  if (!cnpjByIndex.has(index)) {
    cnpjByIndex.set(index, makeFactoryTestCNPJ());
  }

  return cnpjByIndex.get(index)!;
}

/** @deprecated Use getTestCPF(index) para preservar dados por suite */
export function makeTestCPF(): string {
  return makeFactoryTestCPF();
}

/** @deprecated Use getTestCNPJ(index) para preservar dados por suite */
export function makeTestCNPJ(): string {
  return makeFactoryTestCNPJ();
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
