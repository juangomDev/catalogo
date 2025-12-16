import { ClientRepository } from "../domain/repository/client.repository";
import { Email } from "../domain/value_object/email.vo";
import { Client } from "../domain/entity/client.entity";
// import { v4 as uuidv4  } from "uuid"

export class CreateClientCommand {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly description: string
    ) {}
}

export class CreateClientHandler {

    constructor(
        private readonly clientRepository: ClientRepository
    ){}

    async execute(command: CreateClientCommand): Promise<void> {

        const clientId = "klsdafjalksdfjñals"
        const createdAt = new Date();

        try {
            
            const email = Email.create(command.email)

            if (!command.name || command.name.trim().length === 0) {
                throw new Error('name is required');
            }

            const client = new Client(
                clientId,
                command.name,
                email,
                command.description,
                createdAt
            )

            await this.clientRepository.save(client)

        } catch (error) {
            throw error;
        }
    }
}

