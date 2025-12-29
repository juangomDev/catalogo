

export class CreateProductCommand {
    constructor(
        public readonly userId: string,
        public readonly name: string,
        public readonly imageUrl: URL,
        public readonly description: string
    ) { }
}
