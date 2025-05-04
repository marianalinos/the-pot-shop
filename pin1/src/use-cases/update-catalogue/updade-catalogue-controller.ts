import { Request, Response } from 'express';
import { UpdateCatalogue } from './update-catalogue';
import { PrismaCatalogueRepository } from '../../repositories/prisma/prisma-catalogue-repository';
import { PrismaClient } from '@prisma/client';

export class UpdataCatalogueController {
	private updateCatalogue: UpdateCatalogue;

	constructor() {
		this.updateCatalogue = new UpdateCatalogue(
			new PrismaCatalogueRepository(new PrismaClient())
		);
	}

	async update(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const { title } = req.body;
			const catalogue = await this.updateCatalogue.execute({
				id: Number(id),
				title,
			});
			return res.status(200).json(catalogue);
		} catch (error: any) {
			return res.status(400).json({ message: error.message });
		}
	}
}
