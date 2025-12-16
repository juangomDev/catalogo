import { Product } from "../entity/product.entity"

export interface ProductRepository {
    save(product: Product): Promise<void>
    findById(product_id: string): Promise<Product | null>
    findAllProductsByClientId(client_id: string): Promise<Product[]>
    updateName(product_id: string, new_name: string): Promise<void>
    updateImagen(product_id: string, new_url: string): Promise<void>
    updateDescription(product_id: string, new_description: string): Promise<void>
}