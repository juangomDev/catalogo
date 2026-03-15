import { Credentials } from "../entity/credentials.entity"

export interface ICredentialsRepository {
    save(user: Credentials): Promise<void>
    findById(id: string): Promise<Credentials | null>
    findByEmail(email: string): Promise<Credentials | null>
    updateEmail(id: string, newEmail: string): Promise<void>
    updateHash(id: string, newHash: string): Promise<void>
}