

export class RootEntity {
    private readonly id: string;
    private readonly createdAt: Date;

    constructor(id: string, createdAt: Date) {
        this.id = id
        this.createdAt = createdAt
    }
    
    getId(): string {
        return this.id
    }

    getCreatedAt(): Date {
        return this.createdAt
    }
}