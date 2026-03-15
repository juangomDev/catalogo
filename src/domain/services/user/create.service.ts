import { IBcryptHasher } from "../../contracts/IHasher";
import { ICredentialsRepository } from "../../repository/credentials.repository";
import { IUserRepository } from "../../repository/user.repository";
import { UserAlreadyExists } from "../../exceptions/root.exceptions";
import { User } from "../../entity/user.entity";
import { Credentials } from "../../entity/credentials.entity";
import { Email } from "../../value_object/email.vo";
import { randomUUID } from "crypto";


export class CreateUserService {
    constructor(
        private readonly userRepo: IUserRepository,
        private readonly credentialsRepo: ICredentialsRepository,
        private readonly bcryptHasher: IBcryptHasher
    ){}

    async execute(name: string, email: string, password: string, description: string){

        const userExists = await this.credentialsRepo.findByEmail(email)
        if(userExists){
            throw new UserAlreadyExists(email)
        }

        const hashedPassword = await this.bcryptHasher.hash(password)
        const id = randomUUID()
        const emailVO = new Email(email)

        const user = new User(id, name, description, new Date())
        const credentials = new Credentials(id, hashedPassword, emailVO, new Date())
        
        await this.userRepo.save(user)
        await this.credentialsRepo.save(credentials)
    }
}