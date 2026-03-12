import { Email } from "../src/domain/value_object/email.vo";
import { User } from "../src/domain/entity/user.entity";
import { ProductImageUrl, Url } from "../src/domain/value_object/url.vo";
import { UserRepository } from "../src/domain/repository/user.repository";
import { CreateUserCommand } from "../src/application/use-case/user/command/user_command";
import { CreateUserHandler } from "../src/application/use-case/user/create_user.handler";


test("crear un email valido", () => {
    const email = Email.create('t@e.com')
    expect(email.getValue()).toBe('t@e.com')
})

test("crear un user", () => {
    const email = Email.create('test@example.com')
    const user = new User("1", "Test User", email, "A test description", new Date())

    expect(user.getName()).toBe("Test User")
})

test("email no valido", () => {
    expect(() => {
        Email.create("invalid-email")
    }).toThrow({ message: "Email invalid-email is not valid", name: "InvalidEmailError" })
})

test("cambiar email del user", () => {
    const email = Email.create('test@example.com')
    const user = new User("1", "Test User", email, "A test description", new Date())

    const email2 = Email.create('test2@example.com')
    user.updateEmail(email2)


    expect(user.getEmail()).toBe("test2@example.com")
})

// validad url

it("validar url", () => {
    const uy = new URL('https://daa')
    const url = new Url(uy)
    expect(url.getAddress()).toBe('https://daa/')
})


it('url para imagen', () => {
    const uy = new URL('https://example.com/image.jpg')
    const img = ProductImageUrl.create(uy)
    expect(img.getAddress()).toBe('https://example.com/image.jpg');
});


const mockClientRepository: UserRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    updateEmail: jest.fn(),
    updateName: jest.fn(),
    updateDescription: jest.fn(),
};

it('debe crear y guardar el cliente si los datos son válidos', async () => {
    // 1. Arrange (Preparar)
    const command = new CreateUserCommand(
        'Juan Pérez',
        'juan.perez@dominio.com',
        'Cliente de prueba'
    );

    const handler = new CreateUserHandler(mockClientRepository);
    await handler.execute(command);

    expect(mockClientRepository.save).toHaveBeenCalledTimes(1);


    const savedUser = (mockClientRepository.save as jest.Mock).mock.calls[0][0];
    expect(savedUser).toBeInstanceOf(User);


    expect(savedUser.getName()).toBe('Juan Pérez');
    expect(savedUser.getEmail()).toBe('juan.perez@dominio.com');

});


describe('CreateUserHandler', () => {
    let useCase: CreateUserHandler;
    let userRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        userRepository = {
            save: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn(),
            updateEmail: jest.fn(),
            updateName: jest.fn(),
            updateDescription: jest.fn()
        };

        useCase = new CreateUserHandler(userRepository);
    });

    it('should create a user successfully', async () => {
        // Arrange
        userRepository.findByEmail.mockResolvedValue(null);
        userRepository.save.mockResolvedValue();

        const command = new CreateUserCommand(
            'John Doe',
            'john@example.com',
            'Test user'
        );

        // Act
        await useCase.execute(command);

        // Assert
        expect(userRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
        expect(userRepository.save).toHaveBeenCalled();
    });
})