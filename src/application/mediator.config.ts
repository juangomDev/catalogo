import { mediator } from "./mediator";
import { CreateUserHandler } from "./user/create_user.handler";
import { UserRepository } from "../domain/repository/user.repository";


export class MediatorConfig {
    static configure() {

        const userRepository = {} as UserRepository; 

        mediator.subscribe("CreateUserCommand", new CreateUserHandler( userRepository ) )

    }
}