import { Product } from "../models/product";
import {
  CreateProductDTO,
  UpdateProductDTO,
} from "../controllers/product/product-dto";

export interface ProductRepository {
  create(data: CreateProductDTO): Promise<void>;
  read(type: number | undefined): Promise<Product[]>;
  findById(product_id: number): Promise<Product | null>;
  update(data: UpdateProductDTO): Promise<Product>;
  delete(product_id: number): Promise<void>;
}
