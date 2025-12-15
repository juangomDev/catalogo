import { Suma } from "../src/index";
import { Email, ValidateEmail } from "../src/domain/value_object/email.vo";
import { Client } from "../src/domain/entity/client.entity";
import { ProductImageUrl, Url } from "../src/domain/value_object/url.vo";

test("suma de 2 + 3 debe ser 5", () => {
    expect( Suma(2, 3)).toBe(5)
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

it("validar url", () =>{
    const url = Url.create('https://daa')
    expect(url.getValue()).toBe('https://daa')
})

it('url invalida lanza error', () => {
    expect( ValidateEmail.validateEmail('invalid-url') ).toBe(false);
});


it('url para imagen', () => {
    const img = ProductImageUrl.create('https://example.com/image.jpg')
    expect( img.getValue() ).toBe('https://example.com/image.jpg');
});
