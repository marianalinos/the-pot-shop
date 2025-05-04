import { PrismaClient } from '@prisma/client';
import { CatalogueRepository } from '../catalogue-repository';
import { Catalogue } from '../../entities/catalogue';
import { CreateCatalogueDTO } from '../../use-cases/create-catalogue/create-catalogue-dto';
import { UpdateCatalogueDto } from '../../use-cases/update-catalogue/update-catalogue-dto';

export class PrismaCatalogueRepository implements CatalogueRepository {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async create(catalogue: CreateCatalogueDTO): Promise<void> {
		if (await this.findByName(catalogue.title)) {
			throw new Error('Catalogue already exists');
		}
		await this.prisma.catalogue.create({
			data: {
				cata_title: catalogue.title,
			},
		});
	}
	
	async findByName(title: string): Promise<Catalogue | null> {
		const catalogue = await this.prisma.catalogue.findFirst({
			where: {
				cata_title: title,
			},
		});

		if (!catalogue) {
			return null;
		}
		return new Catalogue(catalogue.cata_id, catalogue.cata_title);
	}

	async read(): Promise<Catalogue[]> {
		const catalogues = await this.prisma.catalogue.findMany();
		return catalogues.map(
			(catalogue: { cata_id: number; cata_title: string }) =>
				new Catalogue(catalogue.cata_id, catalogue.cata_title),
		);
	}

	async update(catalogue: UpdateCatalogueDto): Promise<Catalogue> {
		const updatedCatalogue = await this.prisma.catalogue.update({
			where: {
				cata_id: catalogue.id,
			},
			data: {
				cata_title: catalogue.title,
			},
		});
		return new Catalogue(
			updatedCatalogue.cata_id,
			updatedCatalogue.cata_title,
		);
	}
	async delete(id: number): Promise<void> {
		await this.prisma.catalogue.delete({
			where: {
				cata_id: id,
			},
		});
	}
}
