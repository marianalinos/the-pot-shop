import { Request, Response } from 'express';
import { DeleteCatalogueDTO } from './delete-catalogue-dto';
import { PrismaCatalogueRepository } from '../../repositories/prisma/prisma-catalogue-repository';
import { DeleteCatalogue } from './delete-catalogue';
import { PrismaClient } from '@prisma/client';

export class DeleteCatalogueController {
	private deleteCatalogue: DeleteCatalogue;

	constructor() {
		this.deleteCatalogue = new DeleteCatalogue(
			new PrismaCatalogueRepository(new PrismaClient()),
		);
	}

	async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const catalogue: DeleteCatalogueDTO = {
			id: Number(id),
		};
		await this.deleteCatalogue.execute(catalogue.id);
		return res.json({ id }).status(200).send();
	}
}
