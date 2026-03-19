import { InvalidName } from "../exceptions/root.exceptions";
import { RootEntity } from "./root.entity";


export class User extends RootEntity {
    private _name: string;
    private _description: string;

    constructor(id: string, name: string, description: string, createdAt: Date) {

        if (!name || name.trim().length === 0) throw new InvalidName('The name cannot be empty');

        super(id, createdAt)
        this._name = name
        this._description = description
    }



    public updateName(newName: string): void {
        if (!newName || newName.trim().length === 0) throw new InvalidName('The name cannot be empty');

        if (this._name !== newName) this._name = newName;
    }

    public updateDescription(newDescription: string): void {
        if (this._description !== newDescription) this._description = newDescription
    }
    



    public get name(): string {
        return this._name
    }

    public get description(): string {
        return this._description
    }
}
