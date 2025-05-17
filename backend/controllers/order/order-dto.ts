import { OrderStatus } from "@prisma/client";

export interface CreateOrderDTO {
  status?: OrderStatus;
  cartId: number;
}

export interface UpdateOrderDTO {
  id: number;
  status: OrderStatus;
}