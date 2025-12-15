import { Client } from "../entity/client.entity"

export interface IClientRepository {
    save(client: Client): Promise<void>
    findById(client_id: string): Promise<Client | null>
    findByEmail(client_Email: string): Promise<Client | null>
    updateEmail(client_id: string, new_email: string): Promise<void>
    updateName(client_id: string, new_name: string): Promise<void>
    updateDescription(client_id: string, new_description: string): Promise<void>
}