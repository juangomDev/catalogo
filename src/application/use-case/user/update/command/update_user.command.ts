import { ICommand } from "../../../../interface/ICommand";

export class UpdateUserCommand implements ICommand {
    readonly type = "UPDATE_USER";
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
    ) {}
}
