import { Email } from "../value_object/email.vo";
import { RootEntity } from "./root.entity";


export class Credentials extends RootEntity {
    private hash: string
    private email: Email;

    constructor(id: string, hash: string, email: Email, createdAt: Date) {
        super(id, createdAt)
        this.hash = hash
        this.email = email
    }

    public updateHash(newHash: string): void {
        this.hash = newHash
    }

    public updateEmail(newEmail: Email): void {
        this.email = newEmail
    }

    

    public get Hash(): string {
        return this.hash
    }

    public get Email(): string {
        return this.email.getValue()
    }
}