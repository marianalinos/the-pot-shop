export class User {
	private id: number;
	private email: string;
	private secret: string;
	private createdAt: Date;
	private updatedAt: Date;
	private token?: string;

	constructor(
		id: number,
		email: string,
		secret: string,
		createdAt: Date,
		updatedAt: Date,
	) {
		this.id = id;
		this.email = email;
		this.secret = secret;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public getId(): number {
		return this.id;
	}

	public getEmail(): string {
		return this.email;
	}

	public setEmail(email: string) {
		this.email = email;
	}

	public getSecret(): string {
		return this.secret;
	}

	public setSecret(secret: string) {
		this.secret = secret;
	}

	public getCreatedAt(): Date {
		return this.createdAt;
	}

	public getUpdatedAt(): Date {
		return this.updatedAt;
	}
}

export type UserDTO = {
	id: number;
	email: string;
	secret: string;
	createdAt: Date;
	updatedAt: Date;
};
