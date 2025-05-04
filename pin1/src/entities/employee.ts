export class Employee {
	private id: number;
	private pis: string;
	private user_id: number;
	private createdAt: Date;
	private updatedAt: Date;

	constructor(
		id: number,
		pis: string,
		user_id: number,
		createdAt: Date,
		updatedAt: Date,
	) {
		this.id = id;
		this.pis = pis;
		this.user_id = user_id;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public getId(): number {
		return this.id;
	}

	public getPis(): string {
		return this.pis;
	}

	public getUserId(): number {
		return this.user_id;
	}

	public getCreatedAt(): Date {
		return this.createdAt;
	}

	public getUpdatedAt(): Date {
		return this.updatedAt;
	}
}
