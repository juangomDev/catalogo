import { User } from "../entity/user.entity"

export interface UserRepository {
    save(user: User): Promise<void>
    findById(user_id: string): Promise<User | null>
    findByEmail(user_email: string): Promise<User | null>
    updateEmail(user_id: string, new_email: string): Promise<void>
    updateName(user_id: string, new_name: string): Promise<void>
    updateDescription(user_id: string, new_description: string): Promise<void>
}