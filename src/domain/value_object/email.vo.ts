import { InvalidEmail } from "../exceptions/root.exceptions";

export class Email {
    private readonly value: string 

    constructor(email: string) {
        if ( !this.validateEmail(email) ) {
            throw new InvalidEmail(email)
        }

        this.value = email  
    }

    private validateEmail(email: string): boolean {
        const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        return emailRegex.test(email)
    }

    public equals(other: Email): boolean {
        return this.value === other.getValue();
    }


    public getValue(): string {
        return this.value
    }

    public getDomain(): string {
        const parts = this.value.split('@');
        return parts[1] ?? '';
    }
}