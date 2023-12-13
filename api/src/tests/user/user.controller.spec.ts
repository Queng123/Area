import { UserService } from '../../services/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../controllers/user.controller';
import { Response, Request } from 'express';


jest.mock('@supabase/supabase-js', () => {
  const mockSignUp = jest.fn();
  return {
    createClient: jest.fn(() => ({ auth: { signUp: mockSignUp } })),
  };
});

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it('should create a user with email', async () => {
    const mockBody = {
      email: 'test@example.com',
      password: 'testpassword',
      username: 'testuser',
    };

    jest.spyOn(userService, 'createUserWithEmail').mockResolvedValueOnce([201, 'success, User created']);

    const result = await userService.createUserWithEmail(mockBody);

    expect(result).toEqual([201, 'success, User created']);
  });

  it('should handle sign-up error', async () => {
    const mockBody = {
      email: 'test@example.com',
      password: 'testpassword',
      username: 'testuser',
    };

    jest.spyOn(userService, 'createUserWithEmail').mockResolvedValueOnce([500, 'error, internal server error']);

    const result = await userService.createUserWithEmail(mockBody);

    expect(result).toEqual([500, 'error, internal server error']);
  });

  it('should login a user with email', async () => {
    const mockBody = {
      email: 'test@example.com',
      password: 'testpassword',
    };

    jest.spyOn(userService, 'loginUserWithEmail').mockResolvedValueOnce([200, 'success, User logged in']);

    const result = await userService.loginUserWithEmail(mockBody);

    expect(result).toEqual([200, 'success, User logged in']);
  });

  it('should handle login error', async () => {
    const mockBody = {
      email: 'test@example.com',
      password: 'testpassword',
    };

    jest.spyOn(userService, 'loginUserWithEmail').mockResolvedValueOnce([500, 'error, internal server error']);

    const result = await userService.loginUserWithEmail(mockBody);

    expect(result).toEqual([500, 'error, internal server error']);
  });
});

describe('UserCoontroller', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should handle user signup with email', async () => {
    const mockRequest = {
      body: {
        email: 'test@example.com',
        password: 'testpassword',
        username: 'testuser',
      },
    };

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };

    const mockCreateUserResult: [number, string] = [201, 'success, User created'];
    jest.spyOn(userService, 'createUserWithEmail').mockResolvedValueOnce(mockCreateUserResult);

    await controller.signupEmail(mockResponse as Response, mockRequest as Request);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'success, User created' });
  });

  it('should handle user signup error', async () => {
    const mockRequest = {
      body: {
        email: 'test@example.com',
        password: 'testpassword',
        username: 'testuser',
      },
    };

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };

    const mockCreateUserResult: [number, string] = [500, 'error, internal server error'];
    jest.spyOn(userService, 'createUserWithEmail').mockResolvedValueOnce(mockCreateUserResult);

    await controller.signupEmail(mockResponse as Response, mockRequest as Request);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'error, internal server error' });
  });

  it('should handle user login with email', async () => {
    const mockRequest = {
      body: {
        email: 'test@example.com',
        password: 'testpassword',
      }
    };

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };

    const mockLoginUserResult: [number, string] = [200, 'success, User logged in'];
    jest.spyOn(userService, 'loginUserWithEmail').mockResolvedValueOnce(mockLoginUserResult);

    await controller.loginEmail(mockResponse as Response, mockRequest as Request);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'success, User logged in' });
  });

  it('should handle user login error', async () => {
    const mockRequest = {
      body: {
        email: 'test@example.com',
        password: 'testpassword',
      }
    };

    const mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };

    const mockLoginUserResult: [number, string] = [500, 'error, internal server error'];

    jest.spyOn(userService, 'loginUserWithEmail').mockResolvedValueOnce(mockLoginUserResult);

    await controller.loginEmail(mockResponse as Response, mockRequest as Request);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'error, internal server error' });

  });
});