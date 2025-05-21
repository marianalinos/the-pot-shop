import { Product } from "../../models/product";
import {
  CreateProductDTO,
  UpdateProductDTO,
} from "../../controllers/product/product-dto";
import { ProductRepository } from "../product-repository";

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  constructor(products: Product[] = []) {
    this.products = products;
  }
  async create(data: CreateProductDTO): Promise<void> {
    const newProduct = new Product(
      this.products.length + 1,
      data.product_name,
      data.price,
      data.image
    );
    this.products.push(newProduct);
  }
  async read(type: number | undefined): Promise<Product[]> {
    if (type) {
      const products = this.products.filter(
        (product) => product.getId() === type
      );
      return products;
    }
    return this.products;
  }
  async findById(product_id: number): Promise<Product | null> {
    const product = this.products.find((product) => product.getId() === product_id);
    return product ?? null;
  }
  async update(data: UpdateProductDTO): Promise<Product> {
    const index = this.products.findIndex(
      (productRepo) => productRepo.getId() === data.product_id
    );
    const newProduct = new Product(
      data.product_id,
      data.product_name,
      data.price,
      data.image
    );
    this.products[index] = newProduct;
    return newProduct;
  }
  async delete(product_id: number): Promise<void> {
    const index = this.products.findIndex((product) => product.getId() === product_id);
    this.products.splice(index, 1);
  }
}
