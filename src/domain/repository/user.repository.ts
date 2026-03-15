import { User } from "../entity/user.entity"

export interface IUserRepository {
    save(user: User): Promise<void>
    findById(id: string): Promise<User | null>
    updateName(user_id: string, new_name: string): Promise<void>
    updateDescription(user_id: string, new_description: string): Promise<void>
}