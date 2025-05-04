import { Product } from "../models/product";
import * as ProductDTO from "../controllers/product/product-dto";

export interface ProductRepository {
  create(product: ProductDTO.CreateProductDTO): Promise<void>;
  read(type: number | undefined): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  update(product: ProductDTO.UpdateProductDTO): Promise<Product>;
  delete(id: number): Promise<void>;
}
