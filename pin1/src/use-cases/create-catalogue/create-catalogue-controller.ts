import { Request, Response } from 'express';
import { CreateCatalogue } from './create-catalogue';
import { PrismaCatalogueRepository } from '../../repositories/prisma/prisma-catalogue-repository';
import { PrismaClient } from '@prisma/client';

export class CreateCatalogueController {
	private createCatalogue: CreateCatalogue;

	constructor() {
		this.createCatalogue = new CreateCatalogue(
			new PrismaCatalogueRepository(new PrismaClient()),
		);
	}

	async create(req: Request, res: Response): Promise<Response> {
		const { title } = req.body;
		await this.createCatalogue.execute({ title });
		return res.json({ title }).status(201).send();
	}
}
