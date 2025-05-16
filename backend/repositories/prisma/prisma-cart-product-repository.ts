import { PrismaClient } from "@prisma/client";
import { CartProductRepository } from "../cart-product-repository";
import { CartProduct } from "../../models/cart-product";
import {
  CreateCartProductDTO,
  UpdateCartProductDTO,
} from "../../controllers/cart-product/cart-product-dto";

export class PrismaCartProductRepository implements CartProductRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: CreateCartProductDTO): Promise<CartProduct> {
    const cartProduct = await this.prisma.cartProduct.create({
      data: {
        cartId: data.cartId,
        productId: data.productId,
        quantity: data.quantity,
      },
    });
    return new CartProduct(
      cartProduct.id,
      cartProduct.cartId,
      cartProduct.productId,
      cartProduct.quantity
    );
  }

  async read(id: number | undefined): Promise<CartProduct[]> {
    const cartProducts = await this.prisma.cartProduct.findMany({
      where: {
        id: id,
      },
    });
    return cartProducts.map(
      (cartProduct) =>
        new CartProduct(
          cartProduct.id,
          cartProduct.cartId,
          cartProduct.productId,
          cartProduct.quantity
        )
    );
  }

  async findById(id: number): Promise<CartProduct | null> {
    const cartProduct = await this.prisma.cartProduct.findUnique({
      where: { id },
    });
    if (!cartProduct) return null;
    return new CartProduct(
      cartProduct.id,
      cartProduct.cartId,
      cartProduct.productId,
      cartProduct.quantity
    );
  }

  async update(data: UpdateCartProductDTO): Promise<CartProduct> {
    const cartProduct = await this.prisma.cartProduct.update({
      where: { id: data.id },
      data: {
        quantity: data.quantity,
      },
    });
    return new CartProduct(
      cartProduct.id,
      cartProduct.cartId,
      cartProduct.productId,
      cartProduct.quantity
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.cartProduct.delete({
      where: { id },
    });
  }
}
