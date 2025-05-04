import {  Catalogue } from "../../entities/catalogue";
import { CreateCatalogueDTO } from "../../use-cases/create-catalogue/create-catalogue-dto"
import { UpdateCatalogueDto } from "../../use-cases/update-catalogue/update-catalogue-dto";
import { CatalogueRepository } from "../catalogue-repository";

export class InMemoryCatalogueRepository implements CatalogueRepository {
  private catalogues: Catalogue[] = []

	constructor(catalogues: Catalogue[] = []) {
		this.catalogues = catalogues;
	}


  async create(catalogue: CreateCatalogueDTO): Promise <void> {
    if (this.catalogues.find(catalogueRep => catalogueRep.getTitle() === catalogue.title))
			throw new Error('Catalogue already exists');
    const newCatalogue = new Catalogue(
      this.catalogues.length + 1,
      catalogue.title,
    );
    this.catalogues.push(newCatalogue); 
  }
  async findByName(title: string): Promise<Catalogue | null> {
    const catalogue = this.catalogues.find(catalogue => catalogue.getTitle() === title);
    if (!catalogue) return null;
    return catalogue;
  }
  async read(): Promise<Catalogue[]> {
    return this.catalogues;
  }
  async update(catalogue: UpdateCatalogueDto): Promise<Catalogue> {
    const index = this.catalogues.findIndex(
      catalogueRep => catalogueRep.getId() === catalogue.id,
    );
    if (index === -1) throw new Error('Catalogue not found');
    const newCatalogue = new Catalogue(
      catalogue.id,
      catalogue.title,
    );
    this.catalogues[index] = newCatalogue;
    return newCatalogue;

  }
  async delete(id: number): Promise<void> {
    const index = this.catalogues.findIndex(catalogue => catalogue.getId() === id);
    if (index === -1) throw new Error('Catalogue not found');
    this.catalogues.splice(index, 1);
  }

}