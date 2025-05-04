import { describe, it, expect } from 'vitest';
import { Order } from '../../entities/order';
import { InMemoryOrderRepository } from '../../repositories/in-memory/in-memory-order-repository';
import { CreateOrder } from './create-order';
import { Cart } from '../../entities/cart';
import { InMemoryCartRepository } from '../../repositories/in-memory/in-memory-cart-repository';

describe('Create Order', () => {
    it ('should be able to create an order', () =>{
        const createOrder = new CreateOrder(
            new InMemoryOrderRepository(),
            new InMemoryCartRepository([
                new Cart (1, 1, new Date(), new Date())
            ])
        );
        expect(
            createOrder.execute({
                order_nf: '123456789',
                order_status: 1,
                cart_id: 1,
            }),
        ).resolves.toBeUndefined();
    });

    it ('should not be able to create an order with an order_nf that already exists', () =>{
        const createOrder = new CreateOrder(
            new InMemoryOrderRepository([
                new Order(1, 1, 1, '123456789', new Date(), new Date()),
            ]),
            new InMemoryCartRepository(),
        );

        expect(
            createOrder.execute({
                order_nf: '123456789',
                order_status: 1,
                cart_id: 2,
            }),
        ).rejects.toThrowError('Invoice already exists');
    });

    it ('should not be able to create an order with an cart_id that already exists', () =>{
        const createOrder = new CreateOrder(
            new InMemoryOrderRepository([
                new Order(1, 1, 1, '123456789', new Date(), new Date()),
            ]),
            new InMemoryCartRepository(),
        );

        expect(
            createOrder.execute({
                order_nf: '987654321',
                order_status: 1,
                cart_id: 1,
            }),
        ).rejects.toThrowError('Cart already exists');
    });
});