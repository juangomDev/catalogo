import { Product } from "../../domain/entity/product.entity";
import { ProductRepository } from "../../domain/repository/product.repository";
import { ProductImageUrl } from "../../domain/value_object/url.vo";
import { CreateProductCommand } from "./command/product_command";


export class CreateProductHandler {

    constructor(
        private readonly ProductRepository: ProductRepository
    ) { }

    async execute(command: CreateProductCommand): Promise<void> {

        const { userId, name, imageUrl, description } = command;
        const productId = crypto.randomUUID();
        const validImageUrl = ProductImageUrl.create(imageUrl)
        const createdAt = new Date();


        const client = new Product( productId, userId, name, description, validImageUrl, createdAt )


        await this.ProductRepository.save(client)

    }
}
