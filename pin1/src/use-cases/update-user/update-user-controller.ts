import { Request, Response } from 'express';
import { UpdateUser, UpdateUserRequest } from './update-user';
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository';
import { PrismaClient } from '@prisma/client';

export class UpdateUserController {
	private updateUser: UpdateUser;

	constructor() {
		this.updateUser = new UpdateUser(
			new PrismaUserRepository(new PrismaClient()),
		);
	}

	async update(req: Request, res: Response): Promise<Response> {
		try {
			const updateUserRequest : UpdateUserRequest = {
				id: Number(req.params.id),
				email: String(req.body.email),
				secret: String(req.body.secret),
			}
			return res.status(200).json(await this.updateUser.execute(updateUserRequest));
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
