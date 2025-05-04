import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../user-repository';
import { User } from '../../entities/user';
import { CreateUserDTO } from '../../use-cases/create-user/create-user-dto';
import { UpdateUserDTO } from '../../use-cases/update-user/update-user-dto';

export class PrismaUserRepository implements UserRepository {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}
	async findByEmailAndPassword(email: string, secret: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				user_email: email,
			},
		});

		if (!user) {
			return null;
		}

		return new User(
			user.user_id,
			user.user_email,
			user.user_secret,
			user.created_at,
			user.updated_at,
		);
	}



	async create(user: CreateUserDTO): Promise<void> {
		await this.prisma.user.create({
			data: {
				user_email: user.email,
				user_secret: user.secret,
			},
		});
	}



	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				user_email: email,
			},
		});

		if (!user) {
			return null;
		}

		return new User(
			user.user_id,
			user.user_email,
			user.user_secret,
			user.created_at,
			user.updated_at,
		);
	}

	async read(): Promise<User[]> {
		const users = await this.prisma.user.findMany();
		return users.map(
			(user: {
				user_id: number;
				user_email: string;
				user_secret: string;
				created_at: Date;
				updated_at: Date;
			}) =>
				new User(
					user.user_id,
					user.user_email,
					user.user_secret,
					user.created_at,
					user.updated_at,
				),
		);
	}

	async update(user: UpdateUserDTO): Promise<User> {
		const updatedUser = await this.prisma.user.update({
			where: {
				user_id: user.id,
			},
			data: {
				user_email: user.email,
				user_secret: user.secret,
			},
		});

		return new User(
			updatedUser.user_id,
			updatedUser.user_email,
			updatedUser.user_secret,
			updatedUser.created_at,
			updatedUser.updated_at,
		);
	}

	async delete(id: number): Promise<void> {
		await this.prisma.user.delete({
			where: {
				user_id: id,
			},
		});
	}

	async findById(id: number): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				user_id: id,
			},
		});

		if (!user) {
			return null;
		}

		return new User(
			user.user_id,
			user.user_email,
			user.user_secret,
			user.created_at,
			user.updated_at,
		);
	}
}
