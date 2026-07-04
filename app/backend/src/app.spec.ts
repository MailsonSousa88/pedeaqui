import request from 'supertest';
jest.mock('./infra/supabase/supabaseClient', () => ({
  __esModule: true,
  default: {
    auth: {},
    from: jest.fn()
  }
}));
import app from './app';

describe('App', () => {
  it('should return 200 on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'pedeaqui.store API is running!' });
  });
});
