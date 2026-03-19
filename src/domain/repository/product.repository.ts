import { Product } from "../entity/product.entity"

export interface IProductRepository {
    save(product: Product): Promise<void>
    findById(product_id: string): Promise<Product | null>
    findAllByUserId(client_id: string): Promise<Product[]>
}