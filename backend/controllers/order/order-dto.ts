import { OrderStatus } from "@prisma/client";

export interface CreateOrderDTO {
  status?: OrderStatus;
  cart_id: number;
}

export interface UpdateOrderDTO {
  order_id: number;
  status: OrderStatus;
}