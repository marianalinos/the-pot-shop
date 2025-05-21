import { Decimal } from "@prisma/client/runtime/library";
import { OrderStatus } from "@prisma/client";

export class Order {
  private order_id: number;
  private created_at: Date;
  private status: OrderStatus;
  private total: Decimal;
  private customer_id: number | null;
  private cart_id: number;

  constructor(
    id: number,
    createdAt: Date,
    status: OrderStatus,
    total: Decimal,
    customerId: number | null,
    cartId: number
  ) {
    this.order_id = id;
    this.created_at = createdAt;
    this.status = status;
    this.total = total;
    this.customer_id = customerId;
    this.cart_id = cartId;
  }

  public getId(): number {
    return this.order_id;
  }

  public getCreatedAt(): Date {
    return this.created_at;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public getTotal(): Decimal {
    return this.total;
  }

  public getCustomerId(): number | null {
    return this.customer_id;
  }

  public getCartId(): number {
    return this.cart_id;
  }
}