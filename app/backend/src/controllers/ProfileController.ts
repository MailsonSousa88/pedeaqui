import { Response } from 'express';
import { UpdateProfileUseCase } from '../useCases/auth/UpdateProfileUseCase';
import { SupabaseProfileRepository } from '../repositories/supabase/SupabaseProfileRepository';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

const profileRepo = new SupabaseProfileRepository();
const updateProfileUseCase = new UpdateProfileUseCase(profileRepo);

export class ProfileController {
  updateMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const profileId = req.user?.id;
      if (!profileId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { name, phone, document } = req.body;

      const profile = await updateProfileUseCase.execute({ profileId, name, phone, document });
      res.status(200).json(profile);
    } catch (error: any) {
      if (error.message === 'Profile not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      if (
        error.message === 'Invalid CPF' ||
        error.message === 'At least one field must be provided to update' ||
        error.message === 'Profile name cannot be empty' ||
        error.message === 'Profile phone cannot be empty'
      ) {
        res.status(400).json({ error: error.message });
        return;
      }
      if (error.message === 'CPF already registered') {
        res.status(409).json({ error: error.message });
        return;
      }
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export const profileController = new ProfileController();
