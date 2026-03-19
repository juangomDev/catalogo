import { UserNotFound } from "../../exceptions/root.exceptions";
import { IUserRepository } from "../../repository/user.repository";

export interface UpdateUserData {
    name: string;
    description: string;
}

export class UpdateUserService {
    constructor(private readonly userRepo: IUserRepository) {}

    async execute(userId: string, data: UpdateUserData): Promise<void> {

        const user = await this.userRepo.findById(userId);
        if (!user) throw new UserNotFound("Usuario no encontrado");

        user.updateName(data.name);
        user.updateDescription(data.description);

        await this.userRepo.save(user);
    }
}