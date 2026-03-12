import { User } from "../../../../domain/entity/user.entity";
import { UserRepository } from "../../../../domain/repository/user.repository";
import { Email } from "../../../../domain/value_object/email.vo";
import { CreateUserCommand } from "./command/user_command";


export class CreateUserHandler {

    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(command: CreateUserCommand): Promise<void> {
        
        const { name, email, description } = command;
        
        // 1. Validar que el email no exista
        const validEmail = Email.create(email)
        const existingUser = await this.userRepository.findByEmail(validEmail.getValue())

        if ( existingUser ) {
            throw new Error('Email is already in use')
        }

        // 2. Crear ID único
        const userId = crypto.randomUUID();

        // 3.Obtener fecha de creación
        const createdAt = new Date();

        // 4. Crear entidad de usuario usando
        const user = new User( userId, name, validEmail, description, createdAt )

        // 5. Guardar en repositorio
        await this.userRepository.save(user)

    }
}
