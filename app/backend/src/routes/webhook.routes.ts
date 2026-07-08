import { Router } from 'express';
import express from 'express';
import { WebhookController } from '../controllers/WebhookController';

const router = Router();
const webhookController = new WebhookController();

// Use express.raw specifically for Stripe webhook to preserve raw body
router.post('/stripe', express.raw({ type: 'application/json' }), webhookController.handleStripeWebhook);

export default router;
