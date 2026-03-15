import { CreateUserService } from "../../../../domain/services/user/create.service";
import { ICommandHandler } from "../../../interface/IHandler";
import { CreateUserCommand } from "./command/user_command";


export class CreateUserHandler implements ICommandHandler<CreateUserCommand, void>{
    constructor(
        private readonly service: CreateUserService
    ) {}

    async handler(command: CreateUserCommand): Promise<void> {
        const { name, email, password, description } = command
        await this.service.execute(name, email, password, description)
    }
}
