import { InvalidName } from "../exceptions/root.exceptions";
import { ProductImageUrl } from "../value_object/url.vo";
import { RootEntity } from "./root.entity";

type ProductDTO = {
    id: string;
    client_Id: string
    name: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
}

export class Product extends RootEntity {
    private client_Id: string
    private name: string;
    private description: string;
    private imageUrl: ProductImageUrl;

    constructor(id: string, client_Id: string, name: string, description: string, imageUrl: ProductImageUrl, createdAt: Date,) {

        if (!name || name.trim().length === 0) {
            throw new InvalidName('The product name cannot be empty');
        }

        super(id, createdAt)
        this.client_Id = client_Id
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


    public getName(): string {
        return this.name
    }

    public getDescription(): string {
        return this.description
    }

    public getImageUrl(): ProductImageUrl {
        return this.imageUrl
    }

    public DTO(): ProductDTO {
        return {
            id: this.getId(),
            client_Id: this.client_Id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl.getAddress(),
            createdAt: this.getCreatedAt()
        }
    }

}