import { UserController } from '../../../../src/infrastructure/api/controllers/user.controller';
import { mediator } from '../../../../src/application/mediator';
import { Request, Response, NextFunction } from 'express';
import { CreateUserCommand } from '../../../../src/application/use-case/user/create/command/user_command';

// Mock the mediator
jest.mock('../../../../src/application/mediator', () => ({
    mediator: {
        sendCommand: jest.fn(),
    },
}));

describe('UserController', () => {
    let userController: UserController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        userController = new UserController();
        mockRequest = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                description: 'A test user',
                password: 'password123',
            },
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Create', () => {
        it('should create a user and return a 201 status code', async () => {
            // Arrange
            const { name, email, description, password } = mockRequest.body;
            const command = new CreateUserCommand(name, email, description, password);

            // Act
            await userController.Create(mockRequest as Request, mockResponse as Response, mockNext);

            // Assert
            expect(mediator.sendCommand).toHaveBeenCalledWith(command);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User created successfully' });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should call next with an error if user creation fails', async () => {
            // Arrange
            const error = new Error('User creation failed');
            (mediator.sendCommand as jest.Mock).mockRejectedValueOnce(error);

            // Act
            await userController.Create(mockRequest as Request, mockResponse as Response, mockNext);

            // Assert
            expect(mockNext).toHaveBeenCalledWith(error);
            expect(mockResponse.status).not.toHaveBeenCalled();
            expect(mockResponse.json).not.toHaveBeenCalled();
        });
    });
});
