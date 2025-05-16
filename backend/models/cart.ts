import { Decimal } from "@prisma/client/runtime/library";

export class Cart {
  private cart_id: number;
  private cart_total: Decimal;
  private cart_couponCode: string | null;
  private cart_customerId: number | null;

  constructor(
    id: number,
    total: Decimal,
    couponCode: string | null = null,
    customerId: number | null = null
  ) {
    this.cart_id = id;
    this.cart_total = total;
    this.cart_couponCode = couponCode;
    this.cart_customerId = customerId;
  }

  public getId(): number {
    return this.cart_id;
  }

  public getTotal(): Decimal {
    return this.cart_total;
  }

  public setTotal(total: Decimal): void {
    this.cart_total = total;
  }

  public getCouponCode(): string | null {
    return this.cart_couponCode;
  }

  public getCustomerId(): number | null {
    return this.cart_customerId;
  }
}