import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../authMiddleware';
import supabase from '../../infra/supabase/supabaseClient';

jest.mock('../../infra/supabase/supabaseClient', () => ({
  auth: {
    getUser: jest.fn(),
  },
}));

describe('authMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      header: jest.fn(),
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if Authorization header is missing', async () => {
    (mockRequest.header as jest.Mock).mockReturnValue(undefined);

    await authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Authorization header is missing' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should return 401 if Authorization header does not start with Bearer', async () => {
    (mockRequest.header as jest.Mock).mockReturnValue('Basic some-token');

    await authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid Authorization header format' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid (Supabase returns error)', async () => {
    (mockRequest.header as jest.Mock).mockReturnValue('Bearer invalid-token');
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({ data: { user: null }, error: { message: 'Invalid token' } });

    await authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(supabase.auth.getUser).toHaveBeenCalledWith('invalid-token');
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should call next and set req.user if token is valid', async () => {
    (mockRequest.header as jest.Mock).mockReturnValue('Bearer valid-token');
    const mockUser = { id: 'user-123', email: 'test@test.com' };
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({ data: { user: mockUser }, error: null });

    await authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(supabase.auth.getUser).toHaveBeenCalledWith('valid-token');
    expect((mockRequest as any).user).toEqual({ id: 'user-123', email: 'test@test.com' });
    expect(nextFunction).toHaveBeenCalled();
  });
});
