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
        cart_id: data.cart_id,
        product_id: data.product_id,
        quantity: data.quantity,
      },
    });
    return new CartProduct(
      cartProduct.cart_product_id,
      cartProduct.cart_id,
      cartProduct.product_id,
      cartProduct.quantity
    );
  }

  async read(type: number | undefined): Promise<CartProduct[]> {
    const cartProducts = await this.prisma.cartProduct.findMany({
      where: {
        cart_product_id: type,
      },
    });
    return cartProducts.map(
      (cartProduct) =>
        new CartProduct(
          cartProduct.cart_product_id,
          cartProduct.cart_id,
          cartProduct.product_id,
          cartProduct.quantity
        )
    );
  }

  async findById(cart_product_id: number): Promise<CartProduct | null> {
    const cartProduct = await this.prisma.cartProduct.findUnique({
      where: { cart_product_id },
    });
    if (!cartProduct) return null;
    return new CartProduct(
      cartProduct.cart_product_id,
      cartProduct.cart_id,
      cartProduct.product_id,
      cartProduct.quantity
    );
  }

  async update(data: UpdateCartProductDTO): Promise<CartProduct> {
    const cartProduct = await this.prisma.cartProduct.update({
      where: { cart_product_id: data.cart_product_id },
      data: {
        quantity: data.quantity,
      },
    });
    return new CartProduct(
      cartProduct.cart_product_id,
      cartProduct.cart_id,
      cartProduct.product_id,
      cartProduct.quantity
    );
  }

  async delete(cart_product_id: number): Promise<void> {
    await this.prisma.cartProduct.delete({
      where: { cart_product_id },
    });
  }
}
