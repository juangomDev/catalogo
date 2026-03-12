import { ICommand } from "../../command/root.command";


export class CreateUserCommand implements ICommand{
    readonly type = "CREATE_USER"
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly description: string
    ) { }
}
