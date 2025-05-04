export class Cart {
    private id: number;
    private clie_id: number;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(
        id: number,
        clie_id: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.clie_id = clie_id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public getId(): number{
        return this.id;
    }

    public getClieId(): number{
        return this.clie_id;
    }

    public getCreatedAt(): Date {
		return this.createdAt;
	}

	public getUpdatedAt(): Date {
		return this.updatedAt;
	}
}
