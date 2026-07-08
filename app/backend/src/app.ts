import express, { Request, Response } from 'express';

import authRoutes from './routes/authRoutes';
import plansRoutes from './routes/plans.routes';
import subscriptionRoutes from './routes/subscription.routes';
import webhookRoutes from './routes/webhook.routes';
import tenantRoutes from './routes/tenant.routes';
import storeRoutes from './routes/store.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import profileRoutes from './routes/profile.routes';

const app = express();

// Webhook route MUST come before express.json() to preserve the raw body
app.use('/api/webhooks', webhookRoutes);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'pedeaqui.store API is running!' });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
