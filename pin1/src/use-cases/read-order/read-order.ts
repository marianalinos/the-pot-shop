import { Order } from "../../entities/order";
import { OrderRepository } from "../../repositories/order-repository";

export class ReadOrder {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(): Promise<Order[]> {
        return await this.orderRepository.read();
    }
}