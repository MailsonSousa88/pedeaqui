/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppRoute =
  | '/'
  | '/login'
  | '/forgot-password'
  | '/forgot-password/reset'
  | '/register'
  | '/stores'
  | '/sobre-nos'
  | '/termos-de-uso'
  | '/politica-de-privacidade'
  | '/storefront'
  | '/store-preconfiguration'
  | '/market-cart'
  | '/billing/checkout'
  | '/billing/success'
  | '/billing/failed'
  | `/lojas/${string}`
  | `/storefront/${string}/manage`
  | `/storefront/${string}`;
