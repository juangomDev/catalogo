import { Credentials } from "../entity/credentials.entity"

export interface ICredentialsRepository {
    save(user: Credentials): Promise<void>
    findById(id: string): Promise<Credentials | null>
    findByEmail(email: string): Promise<Credentials | null>
}