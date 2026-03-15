import { CreateUserService } from "../../domain/services/user/create.service";
import { CredentialsPostgresRepository } from "../persistence/repositories/credentials_repository";
import { UserPostgresRepository } from "../persistence/repositories/user_repository";
import { BcryptHasher } from "../services/BcryptHasher";
import { mediator } from "../../application/mediator";
import { CreateUserCommand } from "../../application/use-case/user/create/command/user_command";
import { CreateUserHandler } from "../../application/use-case/user/create/create_user.handler";


export class MediatorConfig {
    static configure() {

        // Repositories
        const userRepository = new UserPostgresRepository();
        const credentialsRepository = new CredentialsPostgresRepository();

        // Services
        const bcryptHasher = new BcryptHasher();

        // Domain Services
        const createUserService = new CreateUserService(userRepository, credentialsRepository, bcryptHasher);

        // Handlers
        const createUserHandler = new CreateUserHandler(createUserService);

        // Subscribe
        mediator.subscribeCommand(new CreateUserCommand('', '', '', '').type, createUserHandler)

    }
}