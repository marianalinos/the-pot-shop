import { describe, it, expect } from 'vitest';
import { InMemoryOrderRepository } from '../../repositories/in-memory/in-memory-order-repository';
import { ReadOrder } from './read-order';

describe('read orders', () => {
    it('should be able to read orders', () => {
        const readOrder = new ReadOrder(new InMemoryOrderRepository());

        expect(readOrder.execute()).resolves.toBeInstanceOf(Array);
    });
});