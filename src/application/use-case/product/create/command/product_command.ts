import { ICommand } from "../../../../interface/ICommand";


export class CreateProductCommand implements ICommand {
    readonly type = "CREATE_PRODUCT" 
    constructor(
        public readonly userId: string,
        public readonly name: string,
        public readonly imageUrl: URL,
        public readonly description: string
    ) { }
}
