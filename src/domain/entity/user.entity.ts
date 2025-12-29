import { InvalidName } from "../exceptions/root.exceptions";
import { Email } from "../value_object/email.vo";
import { RootEntity } from "./root.entity";

type UserDTO = {
    id: string;
    name: string;
    email: string;
    description: string;
    createdAt: Date;
}

export class User extends RootEntity {
    private name: string;
    private email: Email;
    private description: string;

    constructor(id: string, name: string, email: Email, description: string, createdAt: Date) {

        if (!name || name.trim().length === 0) {
            throw new InvalidName('The name cannot be empty');
        }

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
    



    public getName(): string {
        return this.name
    }

    public getDescription(): string {
        return this.description
    }

    public getEmail(): string {
        return this.email.getValue()
    }

    public DTO(): UserDTO {
        return {
            id: this.getId(),
            name: this.name,
            email: this.email.getValue(),
            description: this.description,
            createdAt: this.getCreatedAt()   
        }
    }
}
