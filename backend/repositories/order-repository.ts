import { Order } from "../models/order";
import { CreateOrderDTO, UpdateOrderDTO } from "../controllers/order/order-dto";

export interface OrderRepository {
  create(data: CreateOrderDTO): Promise<Order>;
  read(type: number | undefined): Promise<Order[]>;
  findById(order_id: number): Promise<Order | null>;
  update(data: UpdateOrderDTO): Promise<Order>;
  delete(order_id: number): Promise<void>;
}