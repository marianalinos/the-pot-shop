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
      data.customer_id !== undefined && data.customer_id !== null ? String(data.customer_id) : undefined,
    );

    this.carts.push(newCart);
    return newCart;
  }

  async read(type?: number): Promise<Cart[]> {
    if (type) {
      return this.carts.filter((c) => c.getId() === type);
    }
    return this.carts;
  }

  async findById(cart_id: number): Promise<Cart | null> {
    const cart = this.carts.find((c) => c.getId() === cart_id);
    return cart ? cart : null;
  }

  async applyCoupon(cart_id: number, coupon_code: string): Promise<Cart> {
    const cart = this.carts.find((c) => c.getId() === cart_id);
    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.setCouponCode(coupon_code);
    return cart;
  }

  async findByCustomerId(customer_id: number): Promise<Cart | null> {
    const cart = this.carts.find((c) => c.getCustomerId() === customer_id);
    return cart ? cart : null;
  }

  async update(data: UpdateCartDTO): Promise<Cart> {
    const index = this.carts.findIndex((c) => c.getId() === data.cart_id);

    if (index === -1) {
      throw new Error("Cart not found");
    }

    const existingCart = this.carts[index];
    const updatedCart = new Cart(
      existingCart.getId(),
      existingCart.getTotal(),
      data.coupon_code !== undefined
        ? data.coupon_code  
        : existingCart.getCouponCode(),
      data.customer_id !== undefined
        ? data.customer_id
        : existingCart.getCustomerId()
    );

    this.carts[index] = updatedCart;
    return updatedCart;
  }

  async delete(cart_id: number): Promise<void> {
    this.carts = this.carts.filter((c) => c.getId() !== cart_id);
  }

  async calculateTotal(cart_id: number): Promise<Decimal> {
    const cart = this.carts.find((c) => c.getId() === cart_id);
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
