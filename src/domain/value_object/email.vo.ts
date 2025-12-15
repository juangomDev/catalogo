
export class ValidateEmail {
    static validateEmail(email: string): boolean {
        const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        return emailRegex.test(email)
    }
}

export class Email {
    private readonly value: string

    private constructor(email: string) {
        this.value = email  
    }

    static create( email: string ): Email {
        if ( !ValidateEmail.validateEmail(email) ) {
            throw new Error('Invalid email format')
        }

        return new Email(email)
    }

    // ============================
    // Getter
    // ============================

    public getValue(): string {
        return this.value
    }

    public getDomain(): string {
        const parts = this.value.split('@');
        return parts[1] ?? '';
    }
}