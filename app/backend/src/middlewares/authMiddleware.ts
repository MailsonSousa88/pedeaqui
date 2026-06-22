import { Request, Response, NextFunction } from 'express';
import supabase from '../infra/supabase/supabaseClient';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      res.status(401).json({ error: 'Authorization header is missing' });
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Invalid Authorization header format' });
      return;
    }

    const token = authHeader.replace('Bearer ', '');
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({ error: error?.message || 'Invalid token' });
      return;
    }

    req.user = {
      id: data.user.id,
      email: data.user.email,
    };

    next();
  } catch (error: any) {
    res.status(500).json({ error: 'Internal Server Error during authentication' });
  }
};
