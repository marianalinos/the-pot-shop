import { Product } from "./product";

export class CartProduct {
  private cart_product_id: number;
  private cart_id: number;
  private product_id: number;
  private quantity: number;
  private product?: Product

  constructor(cart_product_id: number, cart_id: number, product_id: number, quantity: number, product?: Product) {
    this.cart_product_id = cart_product_id;
    this.cart_id = cart_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.product = product;
  }

  public getId(): number {
    return this.cart_product_id;
  }

  public getCartId(): number {
    return this.cart_id;
  }

  public getProductId(): number {
    return this.product_id;
  }


  public getProduct(): Product | null {
    if (!this.product) {
      return null;
    }
    return this.product;
  }

  public getQuantity(): number {
    return this.quantity;
  }
}