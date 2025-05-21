import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "../product-repository";
import { Product } from "../../models/product";
import { CreateProductDTO, UpdateProductDTO } from "../../controllers/product/product-dto";

export class PrismaProductRepository implements ProductRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async create(data: CreateProductDTO): Promise<void> {
    await this.prisma.product.create({
      data: {
        product_name: data.product_name,
        price: data.price,
        image: data.image,
      },
    });
  }
  async findById(type: number): Promise<Product | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        product_id: type,
      },
    });

    if (!product) {
      return null;
    }

    return new Product(product.product_id, product.product_name, product.price, product.image);
  }
  async read(type: number | undefined): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        product_id: type,
      },
    });
    return products.map(
      (product) =>
        new Product(product.product_id, product.product_name, product.price, product.image)
    );
  }
  async update(data: UpdateProductDTO): Promise<Product> {
    const updatedProduct = await this.prisma.product.update({
      where: {
        product_id: data.product_id,
      },
      data: {
        product_name: data.product_name,
        price: data.price,
        image: data.image,
      },
    });
    return new Product(
      updatedProduct.product_id,
      updatedProduct.product_name,
      updatedProduct.price,
      updatedProduct.image
    );
  }
  async delete(product_id: number): Promise<void> {
    await this.prisma.product.delete({
      where: {
        product_id: product_id,
      },
    });
  }
}
