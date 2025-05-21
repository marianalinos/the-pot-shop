import { Decimal } from "@prisma/client/runtime/library";

export class Product {
  private product_id: number;
  private product_name: string;
  private price: Decimal;
  private image: string;

  constructor(
    product_id: number,
    product_name: string,
    price: Decimal,
    image: string
  ) {
    this.product_id = product_id;
    this.product_name = product_name;
    this.price = price;
    this.image = image;
  }

  public getId(): number {
    return this.product_id;
  }

  public getName(): string {
    return this.product_name;
  }

  public getPrice(): Decimal {
    return this.price;
  }
  public getImage(): string {
    return this.image;
  }
}