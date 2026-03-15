import { InvalidName } from "../exceptions/root.exceptions";
import { ProductImageUrl } from "../value_object/url.vo";
import { RootEntity } from "./root.entity";

export class Product extends RootEntity {
    private user_Id: string
    private name: string;
    private description: string;
    private imageUrl: ProductImageUrl;

    constructor(id: string, user_Id: string, name: string, description: string, imageUrl: ProductImageUrl, createdAt: Date,) {

        if (!name || name.trim().length === 0) {
            throw new InvalidName('The product name cannot be empty');
        }

        super(id, createdAt)
        this.user_Id = user_Id
        this.name = name
        this.description = description
        this.imageUrl = imageUrl
    }

    public updateName(Name: string): void {
        this.name = Name
    }

    public updateDescription(Description: string): void {
        this.description = Description
    }

    public updateImageUrl(url: ProductImageUrl): void {
        this.imageUrl = url
    }


    public get Name(): string {
        return this.name
    }

    public get Description(): string {
        return this.description
    }

    public get ImageUrl(): ProductImageUrl {
        return this.imageUrl
    }

    public get UserId(): string {
        return this.user_Id
    }

}