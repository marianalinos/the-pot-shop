import { Decimal } from "@prisma/client/runtime/library.js";

export class Coupon {
  private id: number;
  private code: string;
  private discount: Decimal;
  private expiration: Date | null;
  private used: boolean;

  constructor(
    id: number,
    code: string,
    discount: Decimal,
    expiration: Date | null = null,
    used: boolean = false
  ) {
    this.id = id;
    this.code = code;
    this.discount = discount;
    this.expiration = expiration;
    this.used = used;
  }
  
  public getId(): number {
    return this.id;
  }
  public getCode(): string {
    return this.code;
  }
  public getDiscount(): Decimal {
    return this.discount;
  }
  public getExpiration(): Date | null {
    return this.expiration;
  }
  public getUsed(): boolean {
    return this.used;
  }
}