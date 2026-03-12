import { User } from "../../../domain/entity/user.entity";
import { UserRepository } from "../../../domain/repository/user.repository";

export class UserPostgresRepository implements UserRepository  {

    save(user: User): Promise<void> {
        user
        return Promise.resolve();
    }

    findById(user_id: string): Promise<User | null> {
        user_id
        throw new Error("Method not implemented.");
    }

    findByEmail(user_email: string): Promise<User | null> {
        // throw new Error("Method not implemented.");
        user_email
        return Promise.resolve(null);
    }

    updateEmail(user_id: string, new_email: string): Promise<void> {
        user_id 
        new_email
        throw new Error("Method not implemented.");
    }

    updateName(user_id: string, new_name: string): Promise<void> {
        user_id
        new_name
        throw new Error("Method not implemented.");
    }

    updateDescription(user_id: string, new_description: string): Promise<void> {
        user_id
        new_description
        throw new Error("Method not implemented.");
    }
}