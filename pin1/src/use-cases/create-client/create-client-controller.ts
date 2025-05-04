import { Request, Response } from 'express';
import { CreateClient, CreateClientRequest } from './create-client';
import { PrismaClientRepository } from '../../repositories/prisma/prisma-client-repository';
import { PrismaClient } from '@prisma/client';

export class CreateClientController {
	private createUser: CreateClient;

	constructor() {
		this.createUser = new CreateClient(
			new PrismaClientRepository(new PrismaClient()),
		);
	}

	async create(req: Request, res: Response): Promise<Response> {
		const createClientRequest : CreateClientRequest = {
			age: Number(req.body.age),
			user_id: Number(req.body.user_id),
		}
		try {
			await this.createUser.execute(createClientRequest);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(201).send();
	}
}
