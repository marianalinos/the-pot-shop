import { Decimal } from "@prisma/client/runtime/library";

export class Cart {
  private cart_id: number;
  private total: Decimal;
  private coupon_code: string | null;
  private customer_id: number | null;

  constructor(
    id: number,
    total: Decimal,
    couponCode: string | null = null,
    customerId: number | null = null
  ) {
    this.cart_id = id;
    this.total = total;
    this.coupon_code = couponCode;
    this.customer_id = customerId;
  }

  public getId(): number {
    return this.cart_id;
  }

  public getTotal(): Decimal {
    return this.total;
  }

  public setTotal(total: Decimal): void {
    this.total = total;
  }

  public setCouponCode(couponCode: string | null): void {
    this.coupon_code = couponCode;
  }

  public getCouponCode(): string | null {
    return this.coupon_code;
  }

  public getCustomerId(): number | null {
    return this.customer_id;
  }
}