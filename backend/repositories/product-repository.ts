import { Product } from "../models/product";
import {
  CreateProductDTO,
  UpdateProductDTO,
} from "../controllers/product/product-dto";

export interface ProductRepository {
  create(product: CreateProductDTO): Promise<void>;
  read(type: number | undefined): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  update(product: UpdateProductDTO): Promise<Product>;
  delete(id: number): Promise<void>;
}
