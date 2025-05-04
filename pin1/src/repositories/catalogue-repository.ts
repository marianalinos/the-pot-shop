import {Catalogue} from "../entities/catalogue";
import { CreateCatalogueDTO } from '../use-cases/create-catalogue/create-catalogue-dto';
import { UpdateCatalogueDto } from "../use-cases/update-catalogue/update-catalogue-dto";

export interface CatalogueRepository {
  create (catalogue: CreateCatalogueDTO): Promise <void>;
  findByName (title: string): Promise< Catalogue | null>;
  read (): Promise< Catalogue[]>;
  update (catalogue: UpdateCatalogueDto): Promise<Catalogue>;
  delete (id: number): Promise<void>;
}
