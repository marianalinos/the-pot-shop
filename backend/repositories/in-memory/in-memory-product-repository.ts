import { Product } from "../../models/product";
import * as ProductDTO from "../../controllers/product/product-dto";
import { ProductRepository } from "../product-repository";

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  constructor(products: Product[] = []) {
    this.products = products;
  }
  async create(product: ProductDTO.CreateProductDTO): Promise<void> {
    const newProduct = new Product(
      this.products.length + 1,
      product.name,
      product.price,
      product.image
    );
    this.products.push(newProduct);
  }
  async read(id: number | undefined): Promise<Product[]> {
    if (id) {
      const products = this.products.filter(
        (product) => product.getId() === id
      );
      return products;
    }
    return this.products;
  }
  async findById(id: number): Promise<Product | null> {
    const product = this.products.find((product) => product.getId() === id);
    return product ?? null;
  }
  async update(product: ProductDTO.UpdateProductDTO): Promise<Product> {
    const index = this.products.findIndex(
      (productRepo) => productRepo.getId() === product.id
    );
    const newProduct = new Product(
      product.id,
      product.name,
      product.price,
      product.image
    );
    this.products[index] = newProduct;
    return newProduct;
  }
  async delete(id: number): Promise<void> {
    const index = this.products.findIndex((product) => product.getId() === id);
    this.products.splice(index, 1);
  }
}
