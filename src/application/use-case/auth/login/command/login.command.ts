import { ICommand } from "../../../../interface/ICommand";


export class LoginCommand implements ICommand {
    readonly type = "LOGIN";
    constructor(
        public readonly email: string,
        public readonly pass: string
    ) { }
}
