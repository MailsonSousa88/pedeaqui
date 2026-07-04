import express, { Request, Response } from 'express';

import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

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
