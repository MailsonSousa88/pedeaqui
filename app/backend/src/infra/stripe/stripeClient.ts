import Stripe from 'stripe';
import config from '../../config';

if (!config.stripe.secretKey) {
  throw new Error(
    'Missing required environment variable: STRIPE_SECRET_KEY'
  );
}

/**
 * Cliente oficial da Stripe.
 *
 * A versão da API é fixada para garantir estabilidade da integração,
 * evitando mudanças automáticas quando novas versões da Stripe forem lançadas.
 */
export const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: '2025-02-24.acacia',
});

export default stripe;