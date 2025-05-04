import { CatalogueRepository } from "../../repositories/catalogue-repository";
import { CreateCatalogueDTO } from "./create-catalogue-dto";


interface CreateCatalogueRequest {
  title : string;
 }
export class CreateCatalogue {

  private catalogueRepository: CatalogueRepository;

  constructor(
    catalogueRepository: CatalogueRepository
  ) {
    this.catalogueRepository = catalogueRepository;
  }

  async execute({ title }: CreateCatalogueRequest): Promise<void> {
    const catalogue : CreateCatalogueDTO = {
      title,
    }
     await this.catalogueRepository.create(catalogue);
  }
}