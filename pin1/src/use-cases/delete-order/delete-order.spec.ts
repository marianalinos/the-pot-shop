import { describe, it, expect } from 'vitest';
import { Order } from '../../entities/order';
import { InMemoryOrderRepository } from '../../repositories/in-memory/in-memory-order-repository';
import { DeleteOrder } from './delete-order';

    describe('delete order', () => {
        it('should be able to delete an order', () => {
            const deleteOrder = new DeleteOrder(
                new InMemoryOrderRepository([
                    new Order(1, 1, 1, '123123', new Date(), new Date(),),
                ]),
            );
            expect(deleteOrder.execute(1)).resolves.toBeUndefined();
        });
    
        it('should not be able to delete an order that does not exist', () => {
            const deleteOrder = new DeleteOrder(new InMemoryOrderRepository());
            expect(deleteOrder.execute(1)).rejects.toThrowError('Order not found');
        })
    });