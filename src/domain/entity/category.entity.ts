import { InvalidName } from "../exceptions/root.exceptions";
import { RootEntity } from "./root.entity";


export class Category extends RootEntity {
    private name: string;
    private description: string;
    private icon: string;

    constructor(id: string, name: string, description: string, icon: string, createAt: Date) {

        if (!name || name.trim().length === 0) {
            throw new InvalidName('The name cannot be empty');
        }

        super(id, createAt)
        this.name = name
        this.description = description
        this.icon = icon
    }

    public updateName(newName: string): void {
        if (!newName || newName.trim().length === 0) {
            throw new InvalidName('The name cannot be empty');
        }
        this.name = newName
    }

    public updateDescription(newDescription: string): void {
        this.description = newDescription
    }

    public updateIcon(newIcon: string): void {
        this.icon = newIcon
    }



    
    public get Name(): string {
        return this.name
    }

    public get Description(): string {
        return this.description
    }

    public get Icon(): string {
        return this.icon
    }
}