import { Decimal } from "@prisma/client/runtime/library";

export class Product {
  private prod_id: number;
  private prod_name: string;
  private prod_price: Decimal;
  private prod_image: string;

  constructor(
    prod_id: number,
    prod_name: string,
    prod_price: Decimal,
    prod_image: string
  ) {
    this.prod_id = prod_id;
    this.prod_name = prod_name;
    this.prod_price = prod_price;
    this.prod_image = prod_image;
  }

  public getId(): number {
    return this.prod_id;
  }

  public getName(): string {
    return this.prod_name;
  }

  public getPrice(): Decimal {
    return this.prod_price;
  }
  public getImage(): string {
    return this.prod_image;
  }
}