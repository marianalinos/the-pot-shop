import { Catalogue } from '../../entities/catalogue';
import { CatalogueRepository } from '../../repositories/catalogue-repository';

export class ReadCatalogue{
	private catalogueRepository: CatalogueRepository;

	constructor(catalogueRepository: CatalogueRepository) {
		this.catalogueRepository = catalogueRepository;
	}

	async execute(): Promise<Catalogue[]> {
		return await this.catalogueRepository.read();
	}
}