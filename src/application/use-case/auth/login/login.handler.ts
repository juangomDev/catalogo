import { LoginService } from "../../../../domain/services/auth/login.service";
import { ICommandHandler } from "../../../interface/IHandler";
import { LoginCommand } from "./command/login.command";

interface Token {
    token: string;
    user: {
        id: string;
    }
}


export class LoginHandler implements ICommandHandler<LoginCommand, Token> {
    constructor(
        private readonly loginService: LoginService
    ) { }

    async handler(command: LoginCommand): Promise<Token> {
        return await this.loginService.execute(command.email, command.pass);
    }
}