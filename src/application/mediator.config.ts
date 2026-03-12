import { UserPostgresRepository } from "../infrastructure/persistence/repositories/user_repository";
import { mediator } from "./mediator";
import { CreateUserCommand } from "./use-case/user/command/user_command";
import { CreateUserHandler } from "./use-case/user/create_user.handler";


export class MediatorConfig {
    static configure() {

        const userRepository = new UserPostgresRepository();

        mediator.subscribeCommand( new CreateUserCommand( '', '', '' ).type, new CreateUserHandler( userRepository ) )

    }
}