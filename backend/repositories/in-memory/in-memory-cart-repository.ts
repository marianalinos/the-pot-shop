// src/repositories/in-memory/in-memory-cart-repository.ts
import { Cart } from "../../models/cart";
import { CartRepository } from "../cart-repository";
import { CreateCartDTO, UpdateCartDTO } from "../../controllers/cart/cart-dto";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryCartRepository implements CartRepository {
  private carts: Cart[] = [];
  private currentId = 1;

  constructor(initialCarts: Cart[] = []) {
    this.carts = initialCarts;
    this.currentId =
      initialCarts.length > 0
        ? Math.max(...initialCarts.map((c) => c.getId())) + 1
        : 1;
  }

  async create(data: CreateCartDTO): Promise<Cart> {
    const newCart = new Cart(
      this.currentId++,
      new Decimal(0),
      data.couponCode || null,
      data.customerId || null
    );

    this.carts.push(newCart);
    return newCart;
  }

  async read(id?: number): Promise<Cart[]> {
    if (id) {
      return this.carts.filter((c) => c.getId() === id);
    }
    return this.carts;
  }

  async findById(id: number): Promise<Cart | null> {
    const cart = this.carts.find((c) => c.getId() === id);
    return cart ? cart : null;
  }

  async update(data: UpdateCartDTO): Promise<Cart> {
    const index = this.carts.findIndex((c) => c.getId() === data.id);

    if (index === -1) {
      throw new Error("Cart not found");
    }

    const existingCart = this.carts[index];
    const updatedCart = new Cart(
      existingCart.getId(),
      existingCart.getTotal(),
      data.couponCode !== undefined
        ? data.couponCode
        : existingCart.getCouponCode(),
      data.customerId !== undefined
        ? data.customerId
        : existingCart.getCustomerId()
    );

    this.carts[index] = updatedCart;
    return updatedCart;
  }

  async delete(id: number): Promise<void> {
    this.carts = this.carts.filter((c) => c.getId() !== id);
  }

  async calculateTotal(id: number): Promise<Decimal> {
    const cart = this.carts.find((c) => c.getId() === id);
    if (!cart) {
      throw new Error("Cart not found");
    }

    if (cart.getTotal().equals(0)) {
      const mockTotal = new Decimal(100); 
      cart.setTotal(mockTotal);
      return mockTotal;
    }

    return cart.getTotal();
  }
}
