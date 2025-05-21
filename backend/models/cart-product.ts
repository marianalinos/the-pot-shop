export class CartProduct {
  private cart_product_id: number;
  private cart_id: number;
  private product_id: number;
  private quantity: number;

  constructor(cart_product_id: number, cart_id: number, product_id: number, quantity: number) {
    this.cart_product_id = cart_product_id;
    this.cart_id = cart_id;
    this.product_id = product_id;
    this.quantity = quantity;
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

  public getQuantity(): number {
    return this.quantity;
  }
}