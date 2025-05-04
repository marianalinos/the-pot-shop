import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ReadClient } from './read-client';
import { PrismaClientRepository } from '../../repositories/prisma/prisma-client-repository';

export class ReadClientController {
	private readClient: ReadClient;

	constructor() {
		this.readClient = new ReadClient(
			new PrismaClientRepository(new PrismaClient())
		);
	}

	async read(req: Request, res: Response): Promise<Response> {
		try {
			const clients = await this.readClient.execute();
      return res.status(200).json(clients);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}

	async readById(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const client = await this.readClient.findById(parseInt(id));
			return res.status(200).json(client);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
