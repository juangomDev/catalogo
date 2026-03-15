import { Email } from "../src/domain/value_object/email.vo";
import { User } from "../src/domain/entity/user.entity";
import { ProductImageUrl, Url } from "../src/domain/value_object/url.vo";
import { CreateUserHandler } from "../src/application/use-case/user/create/create_user.handler";
import { CreateUserCommand } from "../src/application/use-case/user/create/command/user_command";
import { CreateUserService } from "../src/domain/services/user/create.service";
import { InvalidEmail } from "../src/domain/exceptions/root.exceptions";

// Mock dependencies for the handler test
jest.mock('../src/domain/services/user/create.service');

describe('Value Object Tests', () => {
    describe('Email', () => {
        it("should create a valid email", () => {
            const email = new Email('t@e.com');
            expect(email.getValue()).toBe('t@e.com');
        });

        it("should throw an error for an invalid email", () => {
            expect(() => {
                new Email("invalid-email");
            }).toThrow(InvalidEmail);

            expect(() => {
                new Email("invalid-email");
            }).toThrow("Email invalid-email is not valid");
        });
    });

    describe('Url', () => {
        it("should create a valid Url object", () => {
            const urlInput = new URL('https://example.com');
            const url = new Url(urlInput);
            expect(url.getAddress()).toBe('https://example.com/');
        });

        it('should create a valid ProductImageUrl', () => {
            const urlInput = new URL('https://example.com/image.jpg');
            const img = ProductImageUrl.create(urlInput);
            expect(img.getAddress()).toBe('https://example.com/image.jpg');
        });

        it('should throw an error for an invalid ProductImageUrl', () => {
            const urlInput = new URL('https://example.com/document.pdf');
            expect(() => {
                ProductImageUrl.create(urlInput)
            }).toThrow('The image url must end with a valid image extension .jpg, .jpeg, .png, .webp, .gif, .svg');
        });
    });
});

describe('CreateUserHandler', () => {
    let createUserHandler: CreateUserHandler;
    let mockCreateUserService: jest.Mocked<CreateUserService>;

    beforeEach(() => {
        // We mock the service that the handler depends on
        mockCreateUserService = new CreateUserService(null, null, null) as jest.Mocked<CreateUserService>;
        
        // Instantiate the handler with the mocked service
        createUserHandler = new CreateUserHandler(mockCreateUserService);

        // Mock the implementation of the service's execute method
        mockCreateUserService.execute = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call the create user service with the correct parameters', async () => {
        // Arrange
        const command = new CreateUserCommand(
            'John Doe',
            'john.doe@example.com',
            'A test user',
            'password123'
        );

        // Act
        await createUserHandler.handler(command);

        // Assert
        expect(mockCreateUserService.execute).toHaveBeenCalledTimes(1);
        expect(mockCreateUserService.execute).toHaveBeenCalledWith(
            'John Doe',
            'john.doe@example.com',
            'password123',
            'A test user'
        );
    });

    it('should propagate errors from the service', async () => {
        // Arrange
        const command = new CreateUserCommand(
            'John Doe',
            'john.doe@example.com',
            'A test user',
            'password123'
        );
        const testError = new Error('Service failure');
        (mockCreateUserService.execute as jest.Mock).mockRejectedValue(testError);

        // Act & Assert
        await expect(createUserHandler.handler(command)).rejects.toThrow(testError);
    });
});