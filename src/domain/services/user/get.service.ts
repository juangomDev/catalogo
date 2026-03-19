import { User } from "../../entity/user.entity";
import { UserNotFound } from "../../exceptions/root.exceptions";
import { IUserRepository } from "../../repository/user.repository";

export class GetUserByIdService {
    constructor(
        private readonly userRepo: IUserRepository
    ) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepo.findById(id);

        if (!user) throw new UserNotFound(`Usuario con ID ${id} no encontrado`);
        
        return user;
    }
}