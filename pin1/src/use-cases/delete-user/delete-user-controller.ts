import { Request, Response } from 'express';
import { DeleteUser, DeleteUserRequest } from './delete-user';
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository';
import { PrismaClient } from '@prisma/client';

export class DeleteUserController {
	private deleteUser: DeleteUser;

	constructor() {
		this.deleteUser = new DeleteUser(
			new PrismaUserRepository(new PrismaClient()),
		);
	}

	async delete(req: Request, res: Response): Promise<Response> {
		try {
			const deleteUserRequest : DeleteUserRequest = {
				id: Number(req.params.id),
			}
			await this.deleteUser.execute(deleteUserRequest);
			return res.status(200).send();
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
