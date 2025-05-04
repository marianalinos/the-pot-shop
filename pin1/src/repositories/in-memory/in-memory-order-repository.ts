import { Order } from "../../entities/order";
import { CreateOrderDTO } from "../../use-cases/create-order/create-order-dto";
import { UpdateOrderDTO } from "../../use-cases/update-order/update-order-dto";
import { OrderRepository } from "../order-repository";

export class InMemoryOrderRepository implements OrderRepository {
    private orders: Order[] = [];

    constructor(orders: Order[] = []){
        this.orders = orders;
    }

    async create(order: CreateOrderDTO): Promise<void>{
        const newOrder = new Order(
            this.orders.length + 1,
            order.cart_id,
            order.order_status,
            order.order_nf,
            new Date(),
            new Date(),
        )
        this.orders.push(newOrder);
    }

    async findByNF(order_nf: string): Promise<Order | null>{
        const order = this.orders.find(order => order.getNf() === order_nf);
        return order ?? null;
    }

    async findByCartId(cart_id: number): Promise<Order | null>{
        const order = this.orders.find(order => order.getCartId() === cart_id);
        return order ?? null;
    }

    async read(): Promise<Order[]>{
        return this.orders;
    }

    async update(order: UpdateOrderDTO): Promise<Order>{
        const index = this.orders.findIndex(
            orderRepo => orderRepo.getId() === order.id,
    );
    const newOrder = new Order(
        order.id,
        order.cart_id,
        order.orde_status,
        order.orde_nf,
        new Date(),
        this.orders[index].getCreatedAt(),
    );
    this.orders[index] = newOrder;
    return newOrder;
    }

    async findById(id: number): Promise<Order | null>{
        const order = this.orders.find(order => order.getId() === id);
        return order ?? null;
    }
    
    async delete(id: number): Promise<void>{
        const index = this.orders.findIndex(order => order.getId() === id);
        this.orders.splice(index, 1);
    }
}