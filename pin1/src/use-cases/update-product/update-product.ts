import { UpdateProductDTO } from "./update-product-dto";
import { ProductRepository } from "../../repositories/product-repository";
import { Product } from "../../entities/product";

export class UpdateProduct {
  private productRepository: ProductRepository;

  constructor( productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  async update(product: UpdateProductDTO): Promise<Product> {
    if (await this.productRepository.findByName(product.name)) {
      throw new Error("Product already exists");
    }

    if (!await this.productRepository.findById(product.id)) {
      throw new Error("Product not found");
    }

    
    return await this.productRepository.update(product);
  }
}