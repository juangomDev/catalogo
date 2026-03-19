

export class RootEntity {
    private readonly _id: string;
    private readonly _createdAt: Date;

    constructor(id: string, createdAt: Date) {
        this._id = id
        this._createdAt = createdAt
    }
    
    public get id(): string {
        return this._id
    }

    public get createdAt(): Date {
        return this._createdAt
    }
}