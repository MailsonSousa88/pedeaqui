/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppRoute =
  | '/'
  | '/login'
  | '/register'
  | '/stores'
  | '/storefront'
  | '/store-preconfiguration'
  | '/market-cart'
  | '/billing/checkout'
  | '/billing/success'
  | '/billing/failed'
  | `/storefront/${string}`;
