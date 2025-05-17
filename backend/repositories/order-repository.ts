import { Order } from "../models/order";
import { CreateOrderDTO, UpdateOrderDTO } from "../controllers/order/order-dto";

export interface OrderRepository {
  create(order: CreateOrderDTO): Promise<Order>;
  read(id: number | undefined): Promise<Order[]>;
  findById(id: number): Promise<Order | null>;
  update(order: UpdateOrderDTO): Promise<Order>;
  delete(id: number): Promise<void>;
}