import { OrderRepository } from '../../repositories/order-repository';
import { DeleteOrderDTO } from './delete-order-dto';

export class DeleteOrder {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(id: number): Promise<void> {
        if (!(await this.orderRepository.findById(id))) {
            throw new Error('Order not found');
        }
        const order: DeleteOrderDTO = {
            id,
        };
        await this.orderRepository.delete(order.id);
    }
}