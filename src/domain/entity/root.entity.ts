

export class RootEntity {
    private readonly id: string;
    private readonly createdAt: Date;

    constructor(id: string, createdAt: Date) {
        this.id = id
        this.createdAt = createdAt
    }
    
    public get Id(): string {
        return this.id
    }

    public get CreatedAt(): Date {
        return this.createdAt
    }
}