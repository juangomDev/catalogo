import { User } from "../entity/user.entity"

export interface IUserRepository {
    save(user: User): Promise<void>
    findById(id: string): Promise<User | null>
}