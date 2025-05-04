import { OrderRepository } from '../../repositories/order-repository';
import { CreateOrderDTO } from './create-order-dto';
import { CartRepository } from '../../repositories/cart-repository';

export type CreateOrderRequest = {
    order_nf: string;
    order_status: number;
    cart_id: number;
}

export class CreateOrder {
    private orderRepository: OrderRepository;
    private cartRepository: CartRepository;

    constructor(orderRepository: OrderRepository, cartRepository: CartRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    async execute({ order_nf, order_status, cart_id }: CreateOrderRequest) {
        if (await this.orderRepository.findByNF(order_nf)) {
            throw new Error('Invoice already exists');
        }
        if (await this.orderRepository.findByCartId(cart_id)) {
            throw new Error('Cart already exists'); 
        }
        if (!(await this.cartRepository.findById(cart_id))) {
            throw new Error('Cart not found');
        }
        const order: CreateOrderDTO = {
            order_nf,
            order_status,
            cart_id,
        };
        await this.orderRepository.create(order);
    }
}
