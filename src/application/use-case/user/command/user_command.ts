import { ICommand } from "../../../interface/ICommand";



export class CreateUserCommand implements ICommand{
    readonly type = "CREATE_USER"
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly description: string
    ) { }
}
