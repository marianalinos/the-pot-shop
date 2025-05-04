import { Request, Response } from 'express';
import { CreateUser, CreateUserRequest } from './create-user';
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository';
import { PrismaClient } from '@prisma/client';

export class CreateUserController {
	private createUser: CreateUser;

	constructor() {
		this.createUser = new CreateUser(
			new PrismaUserRepository(new PrismaClient()),
		);
	}

	async create(req: Request, res: Response): Promise<Response> {
		const createUserRequest : CreateUserRequest = {
			email: String(req.body.email),
			secret: String(req.body.secret),
		}
		try {
			await this.createUser.execute(createUserRequest);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(201).send();
	}
}
