import { Decimal } from "@prisma/client/runtime/library.js";

export class Customer {
  private customer_id: number;
  private customer_name: string;
  private wallet: Decimal;

  constructor(
    customer_id: number,
    customer_name: string,
    wallet: Decimal
  ) {
    this.customer_id = customer_id;
    this.customer_name = customer_name;
    this.wallet = wallet;
  }

  public getId(): number {
    return this.customer_id;
  }
  public getCustomerName(): string {
    return this.customer_name;
  } 
  public getWallet(): Decimal {
    return this.wallet;
  }
  public setWallet(wallet: Decimal): void {
    this.wallet = wallet;
  }
}