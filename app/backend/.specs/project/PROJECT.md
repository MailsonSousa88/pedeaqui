# Project Vision & Goals

## Vision

**PedeAqui.store** is a multi-tenant SaaS platform designed for small and medium merchants to easily create and manage digital storefronts. Orders are processed via WhatsApp, allowing for low friction and quick setup.

## Goals

- **Security:** Provide robust, secure authentication (sign up, login, logout, password recovery, session handling) for tenants and administrators.
- **Reliability:** Maintain stable database persistence via Supabase.
- **Maintainability:** Adhere to Clean Architecture and SOLID principles.
- **Coverage:** Reach 95%+ test coverage for all Use Cases.

## Stakeholders

- **Tenants (Merchants):** Manage their store, catalog, and receive orders.
- **Administrators:** Oversee the SaaS platform, tenants, subscriptions, and logs.
- **End-users (Customers):** Browse merchant stores and place orders (via WhatsApp).

## Constraints

- MUST use Node.js, Express, TypeScript, and Supabase.
- MUST conform to Clean Architecture.
- MUST follow the Exploration Phase testing rules (unit tests required for Use Cases, integration tests prohibited for now).
