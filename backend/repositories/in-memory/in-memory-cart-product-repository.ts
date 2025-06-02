import { CartProduct } from "../../models/cart-product";
import { CartProductRepository } from "../cart-product-repository";
import {
  CreateCartProductDTO,
  UpdateCartProductDTO,
} from "../../controllers/cart-product/cart-product-dto";

export class InMemoryCartProductRepository implements CartProductRepository {
  private cartProducts: CartProduct[] = [];
  private currentId = 1;

  constructor(initialCartProducts: CartProduct[] = []) {
    this.cartProducts = initialCartProducts;
    this.currentId =
      initialCartProducts.length > 0
        ? Math.max(...initialCartProducts.map((cartProduct) => cartProduct.getId())) + 1
        : 1;
  }

  async create(data: CreateCartProductDTO): Promise<CartProduct> {
    const newCartProduct = new CartProduct(
      this.currentId++,
      data.cart_id,
      data.product_id,
      data.quantity || 1
    );
    this.cartProducts.push(newCartProduct);
    return newCartProduct;
  }

  async read(type: number | undefined): Promise<CartProduct[]> {
    if (type) {
      const cartProducts = this.cartProducts.filter(
        (cartProduct) => cartProduct.getId() === type
      );
      return cartProducts;
    }
    return this.cartProducts;
  }

  async findById(cart_product_id: number): Promise<CartProduct | null> {
    const cartProduct = this.cartProducts.find((cartProduct) => cartProduct.getId() === cart_product_id);
    return cartProduct ?? null;
  }

  async update(data: UpdateCartProductDTO): Promise<CartProduct> {
    const index = this.cartProducts.findIndex((cartProduct) => cartProduct.getId() === data.cart_product_id);
    if (index === -1) {
      throw new Error("Cart product not found");
    }

    const existing = this.cartProducts[index];
    const updated = new CartProduct(
      existing.getId(),
      existing.getCartId(),
      existing.getProductId(),
      data.quantity
    );

    this.cartProducts[index] = updated;
    return updated;
  }

  async updateQuantity(cart_product_id: number, quantity: number): Promise<CartProduct> {
    const index = this.cartProducts.findIndex((cartProduct) => cartProduct.getId() === cart_product_id);
    if (index === -1) {
      throw new Error("Cart product not found");
    }

    const existing = this.cartProducts[index];
    const updated = new CartProduct(
      existing.getId(),
      existing.getCartId(),
      existing.getProductId(),
      quantity
    );

    this.cartProducts[index] = updated;
    return updated;
  }

  async delete(cart_product_id: number): Promise<void> {
    const index = this.cartProducts.findIndex((cartProduct) => cartProduct.getId() === cart_product_id);
    if (index !== -1) {
      this.cartProducts.splice(index, 1);
    }
  }
}
