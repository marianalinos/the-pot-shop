import { CatalogueRepository } from "../../repositories/catalogue-repository";
import { DeleteCatalogueDTO } from "./delete-catalogue-dto";


export class DeleteCatalogue{
  private catalogueRepository: CatalogueRepository;

  constructor(catalogueRepository: CatalogueRepository) {
    this.catalogueRepository = catalogueRepository;
  }

  async execute(id: number): Promise<void> {
    const catalogue: DeleteCatalogueDTO = {
      id: id,
    };
    await this.catalogueRepository.delete(catalogue.id);

  }


}