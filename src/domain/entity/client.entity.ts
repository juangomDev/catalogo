import { Email } from "../value_object/email.vo";
import { RootEntity } from "./root.entity";

type ClientDTO = {
    id: string;
    name: string;
    email: string;
    description: string;
    createdAt: Date;
}

export class Client extends RootEntity {
    private name: string;
    private email: Email;
    private description: string;

    constructor(id: string, name: string, email: Email, description: string, createdAt: Date) {
        super(id, createdAt)
        this.name = name
        this.email = email
        this.description = description
    }

    public updateName(newName: string): void {
        this.name = newName
    }

    public updateDescription(newDescription: string): void {
        this.description = newDescription
    }

    public updateEmail(newEmail: Email): void {
        this.email = newEmail
    }
    
    // ============================
    // Getter
    // ============================

    public getName(): string {
        return this.name
    }

    public getDescription(): string {
        return this.description
    }

    public getEmail(): string {
        return this.email.getValue()
    }

    public DTO(): ClientDTO {
        return {
            id: this.getId(),
            name: this.name,
            email: this.email.getValue(),
            description: this.description,
            createdAt: this.getCreatedAt()   
        }
    }
}
