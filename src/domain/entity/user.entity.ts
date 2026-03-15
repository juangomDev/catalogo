import { InvalidName } from "../exceptions/root.exceptions";
import { RootEntity } from "./root.entity";


export class User extends RootEntity {
    private name: string;
    private description: string;

    constructor(id: string, name: string, description: string, createdAt: Date) {

        if (!name || name.trim().length === 0) {
            throw new InvalidName('The name cannot be empty');
        }

        super(id, createdAt)
        this.name = name
        this.description = description
    }



    public updateName(newName: string): void {
        this.name = newName
    }

    public updateDescription(newDescription: string): void {
        this.description = newDescription
    }
    



    public get Name(): string {
        return this.name
    }

    public get Description(): string {
        return this.description
    }
}
