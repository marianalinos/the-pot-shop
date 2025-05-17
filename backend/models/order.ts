import { Decimal } from "@prisma/client/runtime/library";
import { OrderStatus } from "@prisma/client";

export class Order {
  private order_id: number;
  private order_createdAt: Date;
  private order_status: OrderStatus;
  private order_total: Decimal;
  private order_customerId: number | null;
  private order_cartId: number;

  constructor(
    id: number,
    createdAt: Date,
    status: OrderStatus,
    total: Decimal,
    customerId: number | null,
    cartId: number
  ) {
    this.order_id = id;
    this.order_createdAt = createdAt;
    this.order_status = status;
    this.order_total = total;
    this.order_customerId = customerId;
    this.order_cartId = cartId;
  }

  public getId(): number {
    return this.order_id;
  }

  public getCreatedAt(): Date {
    return this.order_createdAt;
  }

  public getStatus(): OrderStatus {
    return this.order_status;
  }

  public getTotal(): Decimal {
    return this.order_total;
  }

  public getCustomerId(): number | null {
    return this.order_customerId;
  }

  public getCartId(): number {
    return this.order_cartId;
  }
}