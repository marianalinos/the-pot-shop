import { Order } from "../entities/order";
import { CreateOrderDTO } from "../use-cases/create-order/create-order-dto";
import { UpdateOrder } from "../use-cases/update-order/update-order";
import { UpdateOrderDTO } from "../use-cases/update-order/update-order-dto";

export interface OrderRepository{
    create(order: CreateOrderDTO): Promise<void>;
    findByNF(order_nf: string): Promise<Order | null>;
    findByCartId(cart_id: number): Promise<Order | null>;
    findById(id: number): Promise<Order | null>;
    read(): Promise<Order[]>;
    update(order: UpdateOrderDTO): Promise<Order>;
    delete(id: number): Promise<void>;
}