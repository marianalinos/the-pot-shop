import { Order } from "../../entities/order";
import { CartRepository } from "../../repositories/cart-repository";
import { OrderRepository } from "../../repositories/order-repository";
import { UpdateOrderDTO } from "./update-order-dto";

export interface UpdateOrderRequest {
    id: number;
    cart_id: number;
    orde_status: number;
    orde_nf: string;
}

export class UpdateOrder {
    private orderRepository: OrderRepository;
    private cartRepository: CartRepository;
    
    constructor(orderRepository: OrderRepository, cartRepository: CartRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    async execute({ 
        id, cart_id, orde_status, orde_nf 
    }: UpdateOrderRequest): Promise<Order> {
        if (!(await this.orderRepository.findById(id))) {
            throw new Error('Order not found');
        }
        const orderWithSameNF = await this.orderRepository.findByNF(orde_nf);
        if (orderWithSameNF && orderWithSameNF.getId() !== id) {
            throw new Error('Order already exists');
        }
        const orderWithSameCartId = await this.orderRepository.findByCartId(cart_id);
        if (orderWithSameCartId && orderWithSameCartId.getId() !== id) {
            throw new Error('Cart already exists');
        }
        if (!(await this.cartRepository.findById(cart_id))) {
            throw new Error('Cart not found');
        }
        const order: UpdateOrderDTO = {
            id,
            cart_id,
            orde_status,
            orde_nf,
        };
        return await this.orderRepository.update(order);
    }
}