import { Request, Response } from 'express';
import { UpdateClient, UpdateClientRequest } from './update-client';
import { PrismaClientRepository } from '../../repositories/prisma/prisma-client-repository';
import { PrismaClient } from '@prisma/client';

export class CreateClientController {
	private updateClient: UpdateClient;

	constructor() {
		this.updateClient = new UpdateClient(
			new PrismaClientRepository(new PrismaClient()),
		);
	}

	async update(req: Request, res: Response): Promise<Response> {
		const createClientRequest : UpdateClientRequest = {
			age: Number(req.body.age),
      id: Number(req.params.id),
		}
		try {
			await this.updateClient.execute(createClientRequest);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(201).send();
	}
}
