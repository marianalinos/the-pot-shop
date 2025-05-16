export class CartProduct {
  private id: number;
  private cartId: number;
  private productId: number;
  private quantity: number;

  constructor(id: number, cartId: number, productId: number, quantity: number) {
    this.id = id;
    this.cartId = cartId;
    this.productId = productId;
    this.quantity = quantity;
  }

  public getId(): number {
    return this.id;
  }

  public getCartId(): number {
    return this.cartId;
  }

  public getProductId(): number {
    return this.productId;
  }

  public getQuantity(): number {
    return this.quantity;
  }
}