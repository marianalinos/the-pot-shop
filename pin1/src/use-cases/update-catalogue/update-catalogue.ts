import {Catalogue} from '../../entities/catalogue';
import { CatalogueRepository } from '../../repositories/catalogue-repository';
import { UpdateCatalogueDto } from './update-catalogue-dto';

interface UpdateCatalogueRequest {
	id: number;
	title: string;
}

export class UpdateCatalogue{
	private catalogueRepository: CatalogueRepository;

	constructor(catalogueRepository: CatalogueRepository) {
		this.catalogueRepository = catalogueRepository;
	}

	async execute({ id, title }: UpdateCatalogueRequest): Promise<Catalogue> {
		const catalogue: UpdateCatalogueDto = {
			id,
		  title,
		};
		return await this.catalogueRepository.update(catalogue);
	}
}


