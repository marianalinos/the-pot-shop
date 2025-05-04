import { Product } from "../entities/product";
import {CreateProductDTO} from "../use-cases/create-product/create-product-dto"
import { DeleteProductDTO } from "../use-cases/delete-product/delete-product-dto";
import { UpdateProductDTO } from "../use-cases/update-product/update-product-dto";

export interface ProductRepository{

  create(product: CreateProductDTO): Promise<void>;
	findByName(name: string): Promise<Product | null>;
	read(type: number | undefined): Promise<Product[]>;
	readById(id: number): Promise<Product | null>;
	update(product: UpdateProductDTO): Promise<Product>;
	delete(id: number,): Promise<void>;
	findById(id: number): Promise<Product | null>;
}