import { Request, Response } from 'express';
import { ReadUser } from './read-user';
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository';
import { PrismaClient } from '@prisma/client';

export type ReadListRequest = {
	page: number;
	limit: number;
	range: number;
	order: string;
	direction: string;
};

export class ReadUserController {
	private readUser: ReadUser;

	constructor() {
		this.readUser = new ReadUser(
			new PrismaUserRepository(new PrismaClient()),
		);
	}

	async read(req: Request, res: Response): Promise<Response> {
		try {
			const users = await this.readUser.execute();
			return res.status(200).json(users);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}

	async findById(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const user = await this.readUser.findById(parseInt(id));
			return res.status(200).json(user);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
