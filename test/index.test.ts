import { Suma } from "../src/index";
import { Email, ValidateEmail } from "../src/domain/value_object/email.vo";
import { Client } from "../src/domain/entity/client.entity";
import { ProductImageUrl, Url } from "../src/domain/value_object/url.vo";
import { CreateClientCommand, CreateClientHandler } from "../src/application/use_cases";
import { ClientRepository } from "../src/domain/repository/client.repository";

test("suma de 2 + 3 debe ser 5", () => {
    expect(Suma(2, 3)).toBe(5)
})

test("crear un email valido", () => {
    const email = Email.create('t@e.com')

    expect(email.getValue()).toBe('t@e.com')
})

test("crear un client", () => {
    const email = Email.create('test@example.com')
    const user = new Client("1", "Test User", email, "A test description", new Date())

    expect(user.getName()).toBe("Test User")
})

test("cambiar email del client", () => {
    const email = Email.create('test@example.com')
    const user = new Client("1", "Test User", email, "A test description", new Date())

    const email2 = Email.create('test2@example.com')
    user.updateEmail(email2)


    expect(user.getEmail()).toBe("test2@example.com")
})

// validad url

it("validar url", () => {
    const url = Url.create('https://daa')
    expect(url.getValue()).toBe('https://daa')
})

it('url invalida lanza error', () => {
    expect(ValidateEmail.validateEmail('invalid-url')).toBe(false);
});


it('url para imagen', () => {
    const img = ProductImageUrl.create('https://example.com/image.jpg')
    expect(img.getValue()).toBe('https://example.com/image.jpg');
});


const mockClientRepository:  ClientRepository = {
    // Usamos jest.fn() para rastrear si el método fue llamado y con qué argumentos
    save: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    updateEmail: jest.fn(),
    updateName: jest.fn(),
    updateDescription: jest.fn(),
};

it('debe crear y guardar el cliente si los datos son válidos', async () => {
    // 1. Arrange (Preparar)
    const command = new CreateClientCommand(
        'Juan Pérez',
        'juan.perez@dominio.com',
        'Cliente de prueba'
    );

    const handler = new CreateClientHandler(mockClientRepository);
    await handler.execute(command);

    expect(mockClientRepository.save).toHaveBeenCalledTimes(1);


    const savedClient = (mockClientRepository.save as jest.Mock).mock.calls[0][0];
    expect(savedClient).toBeInstanceOf(Client);

    
    expect(savedClient.getName()).toBe('Juan Pérez');
    expect(savedClient.getEmail()).toBe('juan.perez@dominio.com');
});