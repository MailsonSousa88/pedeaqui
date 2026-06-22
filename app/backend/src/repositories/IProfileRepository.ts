import { Profile } from '../models/Profile';

export interface IProfileRepository {
  create(profile: Profile): Promise<Profile>;
  findById(id: string): Promise<Profile | null>;
  findByDocument(document: string): Promise<Profile | null>;
}
