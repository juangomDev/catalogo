import { UpdateUserService } from "../../../../domain/services/user/update.service";
import { ICommandHandler } from "../../../interface/IHandler";
import { UpdateUserCommand } from "./command/update_user.command";


export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, void> {

    constructor(private readonly updateUserService: UpdateUserService) {}

    public async handler(command: UpdateUserCommand): Promise<void> {
        
        await this.updateUserService.execute(command.id, {
            name: command.name,
            description: command.description
        });
    }
}
