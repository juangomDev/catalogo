import { IBcryptHasher } from "../../contracts/IHasher";
import { ITokenService } from "../../contracts/IToken";
import { invalidCredentials, UserNotFound } from "../../exceptions/root.exceptions";
import { ICredentialsRepository } from "../../repository/credentials.repository";
import { IUserRepository } from "../../repository/user.repository";

export class LoginService {
    constructor(
        private readonly credentialRepo: ICredentialsRepository,
        private readonly userRepo: IUserRepository,
        private readonly hasher: IBcryptHasher,
        private readonly token: ITokenService
    ){}

    async execute(email: string, hash: string): Promise<{ token: string, user: { id: string } }> {
        const credential = await this.credentialRepo.findByEmail(email);
        if (!credential) throw new invalidCredentials("Credenciales inválidas");
        
    
        const isPasswordValid = await this.hasher.compare(hash, credential.Hash)
        if (!isPasswordValid) throw new invalidCredentials("Credenciales inválidas");
        

        const user = await this.userRepo.findById(credential.id);
        if (!user) throw new UserNotFound("Usuario no encontrado");

        const token = this.token.generate({
            id: user.id,
        });

        return {
            token,
            user: {
                id: user.id
            }
        };
    }
}