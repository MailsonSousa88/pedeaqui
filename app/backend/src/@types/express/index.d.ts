/**
 * Global Express type augmentation.
 *
 * Extends `req.user` with the fields populated by `authMiddleware`.
 * `tenantId` is an alias for `id` — by design, tenant.id === profile.id === auth.user.id.
 */
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      email?: string;
      tenantId: string;
    };
  }
}

export {};
