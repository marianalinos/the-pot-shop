import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "../product-repository";
import { Product } from "../../models/product";
import * as ProductDTO from "../../controllers/product/product-dto";

export class PrismaProductRepository implements ProductRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async create(product: ProductDTO.CreateProductDTO): Promise<void> {
    await this.prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        image: product.image,
      },
    });
  }
  async findById(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) {
      return null;
    }

    return new Product(product.id, product.name, product.price, product.image);
  }
  async read(id: number | undefined): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        id: id,
      },
    });
    return products.map(
      (product) =>
        new Product(product.id, product.name, product.price, product.image)
    );
  }
  async update(product: ProductDTO.UpdateProductDTO): Promise<Product> {
    const updatedProduct = await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        name: product.name,
        price: product.price,
        image: product.image,
      },
    });
    return new Product(
      updatedProduct.id,
      updatedProduct.name,
      updatedProduct.price,
      updatedProduct.image
    );
  }
  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
